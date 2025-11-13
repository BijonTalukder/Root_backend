import { Global, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from "../admin.schema";
import { Apply, ApplySchema } from "../apply.schema";
import { Career, CareerSchema } from "../career.schema";
import { ContactUs, ContactUsSchema } from "../contactus.schema";
import { GallerySection, GallerySectionSchema } from "../gallery.schema";
import { GlobalSetting, GlobalSettingSchema } from "../global-setting.schema";
import { HireTeam, HireTeamSchema } from "../hire-team.schema";
import { Team, TeamSchema } from "../team.schema";
import { Testimonial, TestimonialSchema } from "../testimonial.schema";


@Global()
@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Admin.name,schema:AdminSchema
            },
            {
                name:Apply.name,schema:ApplySchema
            },
               {
                name:Career.name,schema:CareerSchema
            },
             {
                name:ContactUs.name,schema:ContactUsSchema
            },
            {
                name:GallerySection.name,schema:GallerySectionSchema
            },
             {
                name:GlobalSetting.name,schema:GlobalSettingSchema
            },
            {
                name:HireTeam.name,schema:HireTeamSchema
            },
              {
                name:Team.name,schema:TeamSchema
            },
            {
                name:Testimonial.name,schema:TestimonialSchema
            },

        ])
    ],
    exports:[MongooseModule]
})
export class SchemaLoaderModule{}