import { Body, Controller, Get, Post, Patch, Delete, Param } from "@nestjs/common";
import { ContactUsService } from "./contactUs.service";
import { ContactUsDto } from "src/lib/dtos/contact-us.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";

@Controller("admin/contact-us")
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService
  ) {}

  @Post("create")
  async create(@Body() payload: ContactUsDto): Promise<ResponseHandler> {
    const res = await this.contactUsService.create(payload);
    return {
      success: true,
      data: res,
      message: "Contact message submitted successfully!",
    };
  }

  @Get("all")
  async getAll(): Promise<ResponseHandler> {
    const res = await this.contactUsService.getAll();
    return {
      success: true,
      data: res,
      message: "Contact messages fetched successfully!",
    };
  }

  @Get("single/:id")
  async getById(@Param("id") id: string): Promise<ResponseHandler> {
    const res = await this.contactUsService.getById(id);
    return {
      success: true,
      data: res,
      message: "Contact message fetched successfully!",
    };
  }

  @Patch("update/:id")
  async update(
    @Param("id") id: string,
    @Body() payload: Partial<ContactUsDto>
  ): Promise<ResponseHandler> {
    const res = await this.contactUsService.update(id, payload);
    return {
      success: true,
      data: res,
      message: "Contact message updated successfully!",
    };
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<ResponseHandler> {
    const res = await this.contactUsService.delete(id);
    return {
      success: true,
      data: res,
      message: "Contact message deleted successfully!",
    };
  }
}
