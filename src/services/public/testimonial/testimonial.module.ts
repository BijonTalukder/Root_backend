import { Module } from "@nestjs/common";
// import { TestimonialService } from "./testimonial.service";
import { TestimonialController } from "./testimonial.controller";
import { TestimonialService } from "src/services/admin/testimonial/testimonial.service";

@Module({
    imports:[
      
    ],
    controllers:[
        TestimonialController
    ],
    providers:[
        TestimonialService
    ]

})
export class TestimonialModule{

}