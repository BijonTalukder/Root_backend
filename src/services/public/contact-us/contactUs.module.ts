import { Module } from "@nestjs/common";
import { ContactUsController } from "./contactUs.controller";
import { ContactUsService } from "src/services/admin/contact-us/contactUs.service";

@Module({
    imports:[],
    controllers:[
        ContactUsController
    ],
    providers:[
        ContactUsService
    ]

})
export class ContactUsModule{}