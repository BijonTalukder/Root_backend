import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";

import { ApplyDto } from "src/lib/dtos/apply-carrer.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { ApplyService } from "src/services/admin/apply/apply.service";

@Controller("public/apply")
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
}
