import { Module } from "@nestjs/common";
import { HireTeamController } from "./hireTeam.controller";
import { HireTeamService } from "./hireTeam.service";
@Module({
    imports:[],
    controllers:[HireTeamController],
    providers:[HireTeamService]
})
export class HireTeamModule{}