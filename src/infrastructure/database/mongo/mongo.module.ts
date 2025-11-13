import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/rootdevs',
        dbName: configService.get<string>('MONGO_DB_NAME') || 'rootdevs',
        autoIndex: true,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule implements OnModuleInit {
  private readonly logger = new Logger(MongoModule.name);

  onModuleInit() {
    this.logger.log('✅ MongoDB Connection Initialized');
  }
}
