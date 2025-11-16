import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "../schemas/admin.schema";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { Observable } from "rxjs";
import { IRequest } from "../interfaces/request";

@Injectable()
export class AdminAuthGuard implements CanActivate{
    constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
    ){}
   async canActivate(context: ExecutionContext): Promise<boolean> {
         const request = context.switchToHttp().getRequest<IRequest>();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }
     try {
      // Verify token
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Check admin exist
      const admin = await this.adminModel.findById(decoded.id);
      if (!admin) {
        throw new UnauthorizedException('Admin does not exist');
      }

      request.user = {
        id:admin._id,
        role:'admin',
        email:admin.email
      }; 
      return true;

    } catch (err) {
      throw new UnauthorizedException('Unauthorized or token expired');
    }

    }

}