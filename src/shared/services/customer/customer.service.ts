import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CUSTOMER_DTO } from 'src/app/api/customer/dto/customer.dto';
import { Customer } from 'src/shared/shared.module';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    readonly CustomerInfoModel: Model<Customer>,
    readonly helperService: HelperService,
  ) {}

  async getCustomer() {
    return this.CustomerInfoModel.find();
  }

  async createCustomer(customerInfo: CUSTOMER_DTO.CustomerRegisterReq) {
    const customer = {
      firstName: customerInfo?.firstName,
      lastName: customerInfo?.lastName,
      emailId: customerInfo.emailId,
      password: this.helperService.encrypt(customerInfo.password),
    };
    return this.CustomerInfoModel.create(customer);
  }
}
