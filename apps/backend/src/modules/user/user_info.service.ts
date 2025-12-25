import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { isEmpty, pick } from 'lodash';

import { UserInfo, UserInfoDocument } from './entities/user_info.schema';
import { CustomLoggerService } from 'src/core/logger/logger.service';
import { GovtDocsDto, UpdateUserInfoDto } from './dto/user_info.dto';
import { getUserInfoResponse, validateDOB } from './helpers';
import { FILE_UPLOAD_KEYS } from 'src/common/constants';
import { FileService } from 'src/core/files/file.service';

const DOC_KEYS = [
  FILE_UPLOAD_KEYS.CITIZENSHIP,
  FILE_UPLOAD_KEYS.NATIONAL_ID,
  FILE_UPLOAD_KEYS.PASSPORT,
  FILE_UPLOAD_KEYS.LICENSE,
];

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UserInfo.name)
    private readonly UserInfo: Model<UserInfoDocument>,
    private readonly logger: CustomLoggerService,
    private readonly file: FileService,
  ) {}

  async findOne(userId: Types.ObjectId) {
    const d = await this.UserInfo.findOne({ userId: new Types.ObjectId(userId) }).populate(
      'userId',
    );
    return d ? getUserInfoResponse(d) : null;
  }

  async handleFiles(files?: Record<string, Express.Multer.File[]>) {
    let imageUrl: string = '';
    const govtDocs: GovtDocsDto[] = [];
    const promises: Promise<any>[] = [];

    if (isEmpty(files)) return {};

    if (files[FILE_UPLOAD_KEYS.PROFILE]?.length) {
      imageUrl = files[FILE_UPLOAD_KEYS.PROFILE][0].path;
    }

    DOC_KEYS.forEach(docType => {
      if (files[docType]?.length) {
        const f = files[docType][0].path;

        if (govtDocs.length < 2) {
          govtDocs.push({
            docType,
            imageUrl: f,
          });
        } else {
          promises.push(this.file.deleteFile(f));
        }
      }
    });

    if (promises.length) await Promise.all(promises);

    return { imageUrl, govtDocs };
  }

  async handleInfo(
    userId: Types.ObjectId,
    data: UpdateUserInfoDto,
    files?: Record<string, Express.Multer.File[]>,
  ) {
    const { imageUrl, govtDocs } = await this.handleFiles(files);
    const obj = pick(data, [
      'fullname',
      'dateOfBirth',
      'gender',
      'maritalStatus',
      'permanentAddress',
      'temporaryAddress',
      'isSameAddress',
      'medicalInfo',
      'occupation',
      'emergencyContacts',
    ]);
    if (obj.dateOfBirth) validateDOB(obj.dateOfBirth);
    if (imageUrl) obj.imageUrl = imageUrl;
    if (govtDocs?.length) obj.govtDocs = govtDocs;

    if (!isEmpty(obj)) {
      await this.UserInfo.findOneAndUpdate(
        {
          userId: new Types.ObjectId(userId),
        },
        {
          $set: obj,
        },
        {
          upsert: true,
          runValidators: true,
          projection: { _id: true },
        },
      );
    }

    this.logger.log(`User info updated. User:${userId as unknown as string}}`);
    return { message: 'User info updated successfully' };
  }
}
