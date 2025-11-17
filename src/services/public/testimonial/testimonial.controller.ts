import { Controller, Get, Query, Req } from "@nestjs/common";
import { IRequest } from "src/lib/interfaces/request";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";
import { TestimonialService } from "src/services/admin/testimonial/testimonial.service";



@Controller('public/testimonial')
export class TestimonialController{
    constructor(
        private readonly testimonialService:TestimonialService
    )
    {

    }

    //get all
    @Get("all")
    async getTestimonials(@Req() req:IRequest, @Query() query:{sortBy:string}): Promise<ResponseHandler>
       {
       const data = await this.testimonialService.getTestimonials({
       sortBy:query.sortBy,
       forPublic:true
       })
     return{
    success:true,
    message:'Testimonials retrieved successfully.',
    data:data
    }

    }

}



