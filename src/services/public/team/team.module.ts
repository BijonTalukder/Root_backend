import { Module } from "@nestjs/common";
import { TeamService } from "src/services/admin/team/team.service";
import { TeamController } from "./team.controller";

@Module({
    imports:[],
    controllers:[TeamController],
    providers:[TeamService]
})
export class TeamModule{}