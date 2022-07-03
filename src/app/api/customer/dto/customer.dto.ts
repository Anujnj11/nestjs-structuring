import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export namespace CUSTOMER_DTO {
  export class CustomerDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({ isArray: true, example: [] })
    address?: any[];

    @ApiProperty()
    isActive: boolean;
  }

  export class CustomerInfoRes {
    @ApiProperty({ type: CustomerDTO })
    data: CustomerDTO;
  }

  export class CustomerRegisterReq {
    @ApiProperty({ required: true, example: 'Anuj', type: String })
    @IsString()
    @MinLength(3)
    firstName: string;

    @IsString()
    @ApiProperty({ example: 'Gupta', type: String })
    lastName?: string;

    @ApiProperty({ required: true, example: 'anuj@heady.io', type: String })
    @IsEmail()
    @IsString()
    emailId: string;

    @ApiProperty({ required: true, example: '********', type: String })
    @IsString()
    @MinLength(5)
    password: string;
  }

  export class CustomerLoginReq {
    @ApiProperty({ required: true, example: 'anuj@heady.io', type: String })
    @IsEmail()
    @IsString()
    emailId: string;

    @ApiProperty({ required: true, example: '********', type: String })
    @IsString()
    @MinLength(5)
    password: string;
  }
}
