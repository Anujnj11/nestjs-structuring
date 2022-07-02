import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ERROR_MESSAGES } from 'src/constants';
import { Order } from 'src/shared/models';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async createOrder() {
    const order = {
      customerId: new Types.ObjectId('62c051192a5ef3da7b09caea'),
      variantId: '121112',
      price: 122,
    };
    return this.orderModel.create(order);
  }

  async getOrder() {
    // throw new BadRequestException(ERROR_MESSAGES.ORDER.INVALID_ORDER_ID);
    return this.orderModel
      .findOne()
      .populate('customerId', 'firstName lastName');
  }
}
