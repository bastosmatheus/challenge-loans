import {
  BadRequestException,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  public transform(value: unknown) {
    try {
      const schemaParsed = this.schema.parse(value);

      return schemaParsed;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const message = error.errors[0].message;

        throw new BadRequestException(message);
      }

      throw new InternalServerErrorException();
    }
  }
}
