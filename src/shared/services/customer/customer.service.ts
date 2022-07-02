import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/shared/models';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer')
    private readonly CustomerInfoModel: Model<Customer>,
  ) {}

  async getCustomer() {
    return this.CustomerInfoModel.findOne();
  }

  async createCustomer() {
    const customer = {
      firstName: 'Anuj',
      lastName: 'Gupta',
    };
    return this.CustomerInfoModel.create(customer);
  }
}
