import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TestimonialModule } from "./testimonial/testimonial.module";
import { TeamModule } from "./team/team.module";
import { GlobalSettingModule } from "./global-settings/globalSetting.module";
import { GalleryModule } from "./gallery/gallery.module";
import { ContactUsModule } from "./contact-us/contactUs.module";
import { CareerModule } from "./carrer/career.module";
import { ApplyModule } from "./apply/apply.module";
import { HireTeamModule } from "./hire-team/hireTeam.module";
import { UploadModule } from "./uploads/upload.module";

@Module({
    imports:[
        AuthModule,
         TestimonialModule,
            TeamModule,
            GlobalSettingModule,
            GalleryModule,
            ContactUsModule,
            CareerModule,
            ApplyModule,
            HireTeamModule,
            UploadModule
    ],
    providers:[]
})
export class AdminModule{

}