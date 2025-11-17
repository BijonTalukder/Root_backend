import { Module } from "@nestjs/common";
import { TestimonialModule } from "./testimonial/testimonial.module";
import { ContactUsModule } from "./contact-us/contactUs.module";
import { ApplyModule } from "./apply/apply.module";
import { TeamModule } from "./team/team.module";
import { HireTeamModule } from "./hire-team/hireTeam.module";
import { GalleryModule } from "./gallery/gallery.module";
import { GlobalSettingModule } from "./global-settings/globalSetting.module";
import { UploadModule } from "./uploads/upload.module";

@Module({
    imports:[
        TestimonialModule,
        ContactUsModule,
        ApplyModule,
        TeamModule,
        HireTeamModule,
        GalleryModule,
        GlobalSettingModule,
        UploadModule
    ],
    controllers:[],
    providers:[]
})
export class PublicModule{}