import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { TestimonialService } from "./testimonial.service";
import { IRequest } from "src/lib/interfaces/request";
import { CreateTestimonialDto } from "src/lib/dtos/testimonial.dto";
import { ResponseHandler } from "src/lib/interfaces/responseHandler";


@Controller('admin/testimonial')
export class TestimonialController{
    constructor(
        private readonly testimonialService:TestimonialService

    ){}

  //create testimonial
    @Post('create')
    async create(@Req() req:IRequest,@Body() postBody:CreateTestimonialDto): Promise<ResponseHandler>
    {
     const result = await this.testimonialService.createTestimonial(postBody)


   
     return {
        success:true,
        data:result,
        message:"testimonial created!"
     }
    }


    //get testimonial
    @Get('all')
    async getTestimonials(@Req() req:IRequest, @Query() query): Promise<ResponseHandler>
    {
    const data = await this.testimonialService.getTestimonials({
    sortBy:query.sortBy
    })


    return{
    success:true,
    message:'admin testimonial list',
    data:data
    }

    }

    //update testimonial
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreateTestimonialDto>,
  ): Promise<ResponseHandler> {
    const data = await this.testimonialService.updateTestimonial(id, body);
    return {
      data,
      message: 'Testimonial updated!',
      success: true,
    };
  }
 

  //delete testimonial
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<ResponseHandler> {
    const data = await this.testimonialService.deleteTestimonial(id);
    return {
      data,
      message: 'Testimonial deleted!',
      success: true,
    };
  }

  // STATUS CHANGE (Active/Inactive)
  @Patch(':id/status')
  async toggleStatus(@Param('id') id: string): Promise<ResponseHandler> {
    const data = await this.testimonialService.toggleStatus(id);
    return {
      data,
      message: 'Status updated',
      success: true,
    };
  }

}