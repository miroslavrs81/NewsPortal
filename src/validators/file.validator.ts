import { NotFoundException, ParseFilePipeBuilder } from '@nestjs/common';
import { returnMessages } from 'src/helpers/error-message-mapper.helper';

export const FileValidator = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /png|jpeg|jpg/gi,
  })
  .build({
    exceptionFactory: (err) => {
      if (err) {
        throw new NotFoundException({
          status: returnMessages.ImageIncorrectFormat,
        });
      }
    },
  });
