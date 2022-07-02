import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CustomerController } from './customer.controller';

@Module({
  imports: [SharedModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
