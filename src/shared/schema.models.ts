import { MongooseModule } from '@nestjs/mongoose';
// Schemas
import { CustomerSchema, Customer, Order, OrderSchema } from './models/index';

export const SchemaModels = MongooseModule.forFeature([
  { name: Customer.name, schema: CustomerSchema },
  { name: Order.name, schema: OrderSchema },
]);
