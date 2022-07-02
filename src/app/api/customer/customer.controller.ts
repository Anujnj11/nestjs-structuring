import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerService } from 'src/shared/shared.module';
import { SwaggerDecorator } from 'src/swagger/swagger.decorator';
import { CUSTOMER_DTO } from './dto/customer.dto';

@Controller('app/customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @Version('1')
  @SwaggerDecorator()
  @ApiOperation({
    summary: 'Get Customer v1',
  })
  @ApiOkResponse({ description: 'Success', type: CUSTOMER_DTO.CustomerInfoRes })
  async getCustomer(): Promise<any> {
    return {
      data: await this.customerService.getCustomer(),
    };
  }

  @Post()
  @Version('1')
  @SwaggerDecorator()
  @ApiOperation({
    summary: 'Create New Customer',
  })
  @ApiOkResponse({
    description: 'Success',
    type: CUSTOMER_DTO.CustomerRegisterReq,
  })
  async createCustomer(
    @Body() customerReq: CUSTOMER_DTO.CustomerRegisterReq,
  ): Promise<any> {
    await this.customerService.createCustomer(customerReq);
  }
}
