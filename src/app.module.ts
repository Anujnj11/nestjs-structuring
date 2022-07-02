import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';

//START MODULES
import DatabaseModule from './database/database.module';
import LoggerModule from './logger/loggerModule';
import RedisStoreModule from './redisStore/redisStore.module';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './app/api/customer/customer.module';
import { OrderModule } from './app/api/order/order.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor, AllExceptionsFilter } from './interceptor';

const MODULES = [SharedModule, CustomerModule, OrderModule];
//END MODULES

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule.forRoot(),
    LoggerModule.forRoot(),
    RedisStoreModule.forRoot(),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
