import { Module } from "@nestjs/common";
import { ApplyController } from "./apply.controller";
import { ApplyService } from "src/services/admin/apply/apply.service";

@Module({
    imports:[],
    controllers:[ApplyController],
    providers:[ApplyService]
})
export class ApplyModule{}