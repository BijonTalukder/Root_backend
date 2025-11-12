
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/rootdevs'),
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema}]),

  ],
  exports: [MongooseModule],
})
export class MongoModule implements OnModuleInit{
      private readonly logger = new Logger(MongoModule.name);
      onModuleInit() {
              this.logger.log('✅ MongoDB Connection Initialized');

      }


}
