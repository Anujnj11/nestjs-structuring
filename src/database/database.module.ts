import { Module, DynamicModule, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({})
export default class DatabaseModule {
  private static readonly logger: Logger = new Logger();

  public static getNoSqlConnectionString(config: ConfigService): string {
    const connectionURL = config.get<string>('database');
    if (!connectionURL) {
      console.log('Invalid DB URL');
    }
    return connectionURL;
  }

  public static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => ({
            uri: this.getNoSqlConnectionString(config),
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
          }),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
