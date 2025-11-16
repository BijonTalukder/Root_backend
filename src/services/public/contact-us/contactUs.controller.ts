import { Controller } from "@nestjs/common";
import { ContactUsService } from "./contactUs.service";


@Controller('admin/contact-us')
export class ContactUsController{
    constructor(
                private readonly contractUsService:ContactUsService

    ){}
    async create(){
        // await this.contractUsService.Create({name:"test"})
    }
}