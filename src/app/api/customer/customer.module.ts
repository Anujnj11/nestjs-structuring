import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CustomerController } from './customer.controller';
import { RegisterController } from './register.controller';

const CONTROLLER = [CustomerController, RegisterController];
@Module({
  imports: [SharedModule],
  controllers: [...CONTROLLER],
})
export class CustomerModule {}
