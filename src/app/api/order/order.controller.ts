import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from 'src/shared/shared.module';

@Controller('app/order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @Version('1')
  async getOrder(): Promise<any> {
    return { data: await this.orderService.getOrder() };
  }
}
