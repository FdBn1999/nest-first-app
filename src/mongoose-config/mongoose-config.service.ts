import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const connectionTimeout = Number.parseInt(
      process.env.DB_CONNECTION_TIMEOUT,
    );

    const connectionAttempts = Number.parseInt(
      process.env.DB_CONNECTION_ATTEMPTS,
    );

    return {
      uri: process.env.DB_URI,
      connectTimeoutMS: connectionTimeout,
      retryAttempts: connectionAttempts,
    };
  }
}
