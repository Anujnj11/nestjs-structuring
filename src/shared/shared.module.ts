import { Module } from '@nestjs/common';
import { SchemaModels } from './schema.models';

//START SERVICES
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';

const SERVICES = [CustomerService, OrderService];

//END SERVICES

@Module({
  imports: [SchemaModels],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class SharedModule {}
export { CustomerService, OrderService };
