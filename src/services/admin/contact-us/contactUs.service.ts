import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactUsDto } from "src/lib/dtos/contact-us.dto";
import { ContactUs } from "src/lib/schemas/contactus.schema";

@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name)
    private readonly contactUsModel: Model<ContactUs>,
  ) {}

  async create(data: ContactUsDto) {
    return await this.contactUsModel.create(data);
  }

  async getAll() {
    return await this.contactUsModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string) {
    const contact = await this.contactUsModel.findById(id);
    if (!contact) {
      throw new NotFoundException("Contact not found");
    }
    return contact;
  }

  async update(id: string, data: Partial<ContactUsDto>) {
    const updated = await this.contactUsModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundException("Contact not found");
    }
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.contactUsModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Contact not found");
    }
    return   deleted;
    
  }
}
