import { Module, DynamicModule, Logger, Global } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import RedisStoreService from './redisStore.service';
@Global()
@Module({})
export default class RedisStoreModule {
  private static logger: Logger = new Logger();

  static forRoot(): DynamicModule {
    return {
      module: RedisStoreModule,
      imports: [
        RedisModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (
            config: ConfigService,
          ): Promise<RedisModuleOptions> => {
            return {
              config: {
                keyPrefix: config.get('nodeEnv') + ':',
                host: config.get('redis.host'),
                port: config.get('redis.port'),
                onClientCreated: async (client: any): Promise<void> => {
                  client.on('error', (err: any) => {
                    this.logger.error('Unable to connect to redis', err);
                  });
                  client.on('ready', () => {
                    this.logger.log('Redis is ready.');
                  });
                  client.on('end', () => {
                    this.logger.log('Redis is disconnected');
                  });
                },
              },
            };
          },
          inject: [ConfigService],
        }),
      ],
      providers: [RedisStoreService],
      exports: [RedisStoreService],
    };
  }
}
