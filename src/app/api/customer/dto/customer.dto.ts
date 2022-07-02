import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
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

// class LiveSaleDTO {
//   @IsString()
//   @IsNotEmpty()
//   readonly channelId: string;

//   @IsOptional()
//   @Transform(mongoIdTransform)
//   readonly productListId: Types.ObjectId;

//   @IsNumber()
//   @IsNotEmpty()
//   readonly expireCartInMins: number;

//   @IsOptional()
//   specialCartExpiration: string;

//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @ApiProperty({ type: ['string'] })
//   airTalents: Types.ObjectId[];
// }

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

class CustomerInfoRes {
  @ApiProperty({ type: CustomerDTO })
  data: CustomerDTO;
}

export const CUSTOMER_DTO = {
  CustomerInfoRes,
};
