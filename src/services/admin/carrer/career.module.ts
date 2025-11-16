import { Module } from "@nestjs/common";
import { CarrerService } from "./career.service";
import { CarrerController } from "./career.controller";

@Module({
    imports:[],
    controllers:[CarrerController],
    providers:[CarrerService]
})
export class CareerModule{}