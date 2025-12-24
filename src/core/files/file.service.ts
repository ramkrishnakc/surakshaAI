import * as fsPromises from 'node:fs/promises'; // for the promise-based API
import { Injectable } from '@nestjs/common';

import { CustomLoggerService } from '../logger/logger.service';
import { LOG_CTXT } from 'src/common/constants';

const ctxt = LOG_CTXT.FILE;

@Injectable()
export class FileService {
  constructor(private readonly logger: CustomLoggerService) {}

  async deleteFile(filePath: string) {
    try {
      await fsPromises.unlink(filePath);
      this.logger.log(`File ${filePath} removed successfully`, ctxt);
    } catch (e) {
      this.logger.error(`Error removing file: ${filePath}`, e as Error, ctxt);
    }
  }

  async deleteFolder(folderPath: string) {
    try {
      await fsPromises.rm(folderPath, { recursive: true, force: true });
      this.logger.log(`Folder ${folderPath} and its contents removed successfully`, ctxt);
    } catch (e) {
      this.logger.error(`Error removing folder: ${folderPath}`, e as Error, ctxt);
    }
  }
}
