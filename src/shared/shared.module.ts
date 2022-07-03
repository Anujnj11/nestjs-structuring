import { Module } from '@nestjs/common';
import { SchemaModels } from './schema.models';
import { JwtModule } from '@nestjs/jwt';

//START SERVICES
import { CustomerService } from './services/customer/customer.service';
import { OrderService } from './services/order/order.service';
import { HelperService } from './services/helper/helper.service';

const SERVICES = [CustomerService, OrderService, HelperService];

//END SERVICES

@Module({
  imports: [SchemaModels, JwtModule],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class SharedModule {}
export { CustomerService, OrderService, HelperService };
export * from './models';
