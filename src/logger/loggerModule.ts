import { Module, DynamicModule } from '@nestjs/common';
import { format, transports } from 'winston';
import * as winstonLoggly from 'winston-loggly-bulk';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as path from 'path';
import { environment } from 'src/constants';

// define the custom settings for each transport (file, console)
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(__dirname, '..', '../logs', 'error.log'),
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    colorize: false,
    silent: false,
  },
  console: {
    level: 'warn',
    handleExceptions: false,
    json: false,
    colorize: true,
    silent: false,
  },
  file: {
    level: 'info',
    filename: path.join(__dirname, '..', '../logs', 'combined.log'),
    handleExceptions: false,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    colorize: false,
    silent: false,
  },
};

@Module({})
export default class LoggerModule {
  public static getTransport(
    config: ConfigService,
  ): Array<transports.StreamTransportInstance> {
    const env = config.get('nodeEnv');
    const loggerTransports: Array<any> = [
      // new winstonLoggly.Loggly(config.get('loggly')),
    ];
    if (env && env === environment.local) {
      loggerTransports.push(new transports.File(options.errorFile));
      loggerTransports.push(new transports.File(options.file));
      loggerTransports.push(new transports.Console(options.console));
    }
    return loggerTransports;
  }

  public static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        WinstonModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => ({
            exitOnError: false,
            format: format.combine(format.timestamp(), format.prettyPrint()),
            transports: LoggerModule.getTransport(config),
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
