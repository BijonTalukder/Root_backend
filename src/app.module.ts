import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { SchemaLoaderModule } from './lib/schemas/schema-loader/schema-loader.module';
import { LoggerMiddleware } from './lib/middlewares/logger.middleware';
import { AdminModule } from './services/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { TestimonialModule } from './services/admin/testimonial/testimonial.module';
import { TeamModule } from './services/admin/team/team.module';
import { GlobalSettingModule } from './services/admin/global-settings/globalSetting.module';
import { GalleryModule } from './services/admin/gallery/gallery.module';
// import { ContactUsModule } from './services/public/contact-us/contactUs.module';
import { CareerModule } from './services/admin/carrer/career.module';
import { ContactUsModule } from './services/admin/contact-us/contactUs.module';
import { ApplyModule } from './services/admin/apply/apply.module';
import { HireTeamModule } from './services/admin/hire-team/hireTeam.module';
import { PublicModule } from './services/public/public.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY!,
      signOptions: {
        expiresIn: '120d',
      },
    }),
    SchemaLoaderModule,
    DatabaseModule.register(),
    AdminModule,
    PublicModule
   
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
