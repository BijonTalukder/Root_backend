import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApplyService } from "./apply.service";
import { ApplyDto } from "src/lib/dtos/apply-carrer.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";

@Controller("admin/apply")
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post("create")
  async create(@Body() payload: ApplyDto): Promise<ResponseHandler> {
    const res = await this.applyService.create(payload);
    return {
      success: true,
      data: res,
      message: "Apply successful!",
    };
  }

  @Get("all")
  async findAll(): Promise<ResponseHandler> {
    const res = await this.applyService.getAll();
    return {
      success: true,
      data: res,
      message: "Applications fetched successfully!",
    };
  }

  @Get("single/:id")
  async findOne(@Param("id") id: string): Promise<ResponseHandler> {
    const res = await this.applyService.getById(id);
    return {
      success: true,
      data: res,
      message: "Application fetched successfully!",
    };
  }

  @Patch("update/:id")
  async update(
    @Param("id") id: string,
    @Body() payload: Partial<ApplyDto>
  ): Promise<ResponseHandler> {
    const res = await this.applyService.update(id, payload);
    return {
      success: true,
      data: res,
      message: "Application updated successfully!",
    };
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<ResponseHandler> {
    const res = await this.applyService.delete(id);
    return {
      success: true,
      data: res,
      message: "Application deleted successfully!",
    };
  }
}
