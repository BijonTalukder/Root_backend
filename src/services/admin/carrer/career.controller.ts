import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CarrerService } from "./career.service";
import { CareerDto } from "src/lib/dtos/career.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";

@Controller("admin/career")
export class CarrerController {
  constructor(private readonly carrerService: CarrerService) {}

  @Post("create")
  async create(@Body() data: CareerDto): Promise<ResponseHandler> {
    const result = await this.carrerService.create(data);
    return {
      success: true,
      data: result,
      message: "Career created successfully!",
    };
  }

  @Get("all")
  async getAll(
    @Query("status") status?: string
  ): Promise<ResponseHandler> {
    const result = await this.carrerService.getAll(
      status !== undefined ? status === "true" : undefined
    );
    return {
      success: true,
      data: result,
      message: "Career list fetched successfully!",
    };
  }

  @Get("single/:id")
  async getById(@Param("id") id: string): Promise<ResponseHandler> {
    const result = await this.carrerService.getById(id);
    return {
      success: true,
      data: result,
      message: "Career details fetched successfully!",
    };
  }

  @Patch("update/:id")
  async update(
    @Param("id") id: string,
    @Body() data: CareerDto
  ): Promise<ResponseHandler> {
    const result = await this.carrerService.update(id, data);
    return {
      success: true,
      data: result,
      message: "Career updated successfully!",
    };
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<ResponseHandler> {
    const result = await this.carrerService.delete(id);
    return {
      success: true,
      data: result,
      message: "Career deleted successfully!",
    };
  }
}