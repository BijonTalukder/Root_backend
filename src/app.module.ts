import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AdminModule } from './modules/admin/admin.module';
@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.register(),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
