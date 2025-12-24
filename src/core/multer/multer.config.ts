import { extname, resolve } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { v4 } from 'uuid';
import { IRequest } from 'src/common/types';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

type Cb1 = (e: Error | null, bool: boolean) => any;
type Cb2 = (e: Error | null, str: string) => any;

export interface FileUploadArgs {
  destination: string;
  exts: string[];
  fileSize: number;
  useFieldAsFilename?: boolean;
  useUserIdAsFilename?: boolean;
}

export const GetUploadConfig = ({
  destination,
  exts,
  fileSize,
  useFieldAsFilename,
  useUserIdAsFilename,
}: FileUploadArgs): MulterOptions => {
  const extRegexp = new RegExp(exts.join('|'), 'i');

  return {
    // Enable file size limits
    limits: { fileSize },
    // Check the mimetypes to allow for upload
    fileFilter: (req: any, file: Express.Multer.File, cb: Cb1) => {
      if (extRegexp.exec(file.mimetype)) {
        cb(null, true); // Allow storage of file
      } else {
        // Reject file
        cb(new BadRequestException(`Unsupported file type ${extname(file.originalname)}`), false);
      }
    },
    // Storage properties
    storage: diskStorage({
      // Destination storage path details
      destination: (req: Request, file: Express.Multer.File, cb: Cb2) => {
        const uid = (req as unknown as IRequest).user.id as unknown as string;
        // create folder per user
        const uploadPath = resolve(destination, uid);
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      // File name
      filename: (req: Request, file: Express.Multer.File, cb: Cb2) => {
        const ext = extname(file.originalname);

        let f: string;
        if (useUserIdAsFilename) {
          f = (req as unknown as IRequest).user.id as unknown as string;
        } else {
          f = useFieldAsFilename ? file.fieldname : v4();
        }
        cb(null, `${f}${ext}`);
      },
    }),
  };
};
