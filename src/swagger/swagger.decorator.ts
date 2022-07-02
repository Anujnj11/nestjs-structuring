import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// import { BearerAuthentications } from '../constants';
// import { messageCompose } from './errMsg';
// authType = BearerAuthentications.Member
export function SwaggerDecorator(): any {
  return applyDecorators(
    ApiBadRequestResponse(),
    ApiInternalServerErrorResponse(),
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
  );
}
