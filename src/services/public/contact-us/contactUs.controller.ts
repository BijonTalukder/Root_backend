import { Body, Controller, Post } from "@nestjs/common";
import { ContactUsDto } from "src/lib/dtos/contact-us.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { ContactUsService } from "src/services/admin/contact-us/contactUs.service";


@Controller('public/contact-us')
export class ContactUsController{
    constructor(
                private readonly contactUsService:ContactUsService

    ){}
      @Post("create")
      async create(@Body() payload: ContactUsDto): Promise<ResponseHandler> {
        const res = await this.contactUsService.create(payload);
        return {
          success: true,
          data: res,
          message: "Contact message submitted successfully!",
        };
      }
   
}