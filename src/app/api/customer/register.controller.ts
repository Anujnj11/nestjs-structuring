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

@Controller('app/register')
@ApiTags('Register')
export class RegisterController {
  constructor(private customerService: CustomerService) {}

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

  @Post('login')
  @Version('1')
  @SwaggerDecorator()
  @ApiOperation({
    summary: 'Login customer',
  })
  @ApiOkResponse({
    description: 'Success',
    type: CUSTOMER_DTO.CustomerLoginReq,
  })
  async validateUser(
    @Body() userForm: CUSTOMER_DTO.CustomerLoginReq,
  ): Promise<any> {
    return {
      data: await this.customerService.validateCustomer(
        userForm?.emailId,
        userForm?.password,
      ),
    };
  }
}
