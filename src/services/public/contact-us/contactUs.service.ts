import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactUsDto } from "src/lib/dtos/contact-us.dto";
import { ContactUs } from "src/lib/schemas/contactus.schema";


@Injectable()
export class ContactUsService{
    constructor(
        @InjectModel(ContactUs.name)
        private readonly contactUsModel:Model<ContactUs>
    
    ){}


   async Create(dto:ContactUsDto){
    return await this.contactUsModel.create(dto)
   }

}