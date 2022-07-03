import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CUSTOMER_DTO } from 'src/app/api/customer/dto/customer.dto';
import { ERROR_MESSAGES } from 'src/constants';
import { Customer } from 'src/shared/shared.module';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    readonly customerModel: Model<Customer>,
    readonly helperService: HelperService,
  ) {}

  async getLoginInfo(customerId: Types.ObjectId) {
    const userInfo: any = await this.customerModel
      .findOne({ _id: customerId, isActive: true })
      .lean();
    if (!userInfo) {
      throw new BadRequestException(ERROR_MESSAGES.CUSTOMER.NO_USER_FOUND);
    }
    userInfo.authToken = await this.helperService.prepareJWTToken(userInfo);
    return userInfo;
  }

  /**
   * Validate Customer with email and password
   * @param emailId {string}
   * @param password {string}
   * @returns { UserInfoWithToken }
   */
  async validateCustomer(emailId: string, password: string) {
    const userInfo = await this.customerModel
      .findOne({ emailId, isActive: true })
      .select('password')
      .lean();
    if (!userInfo) {
      throw new BadRequestException(ERROR_MESSAGES.CUSTOMER.NO_USER_FOUND);
    }
    if (!this.helperService.compare(userInfo?.password, password)) {
      throw new BadRequestException(ERROR_MESSAGES.CUSTOMER.NO_USER_FOUND);
    }
    return this.getLoginInfo(userInfo?._id);
  }

  async createCustomer(customerInfo: CUSTOMER_DTO.CustomerRegisterReq) {
    const customer = {
      firstName: customerInfo?.firstName,
      lastName: customerInfo?.lastName,
      emailId: customerInfo.emailId,
      password: this.helperService.encrypt(customerInfo.password),
    };
    return this.customerModel.create(customer);
  }
}
