import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTestimonialDto } from "src/lib/dtos/testimonial.dto";
import { Testimonial } from "src/lib/schemas/testimonial.schema";


@Injectable()
export class TestimonialService{
    constructor(
        @InjectModel(Testimonial.name)
         private readonly testimonialModel: Model<Testimonial>,
    ){

    }
    //create testimonial
    async createTestimonial(data:CreateTestimonialDto){
        const result = await this.testimonialModel.create(data)
        return result;

    }

    //get testimonial
    async getTestimonials(filters: { sortBy?: string; forPublic?: boolean }){
     
       const query: any = {};

    if (filters.forPublic) {
      query.status = true;
    }

    let sort: any = {};
    if (filters.sortBy === 'orderBy') {
        // console.log(filters.sortBy);
        
      sort = { orderBy: 1 }; 
    } else {
      sort = { createdAt: -1 }; 
    }

    return this.testimonialModel.find(query).sort(sort);
  }
   // UPDATE
  async updateTestimonial(id: string, data: any) {
    const result = await this.testimonialModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!result) throw new NotFoundException('Testimonial not found');
    return result;
  }

  // DELETE
  async deleteTestimonial(id: string) {
    const result = await this.testimonialModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Testimonial not found');
    return result;
  }

  // CHANGE STATUS
  async toggleStatus(id: string) {
    const testimonial = await this.testimonialModel.findById(id);
    testimonial.status = !testimonial.status;
    return testimonial.save();
  }
    
}
