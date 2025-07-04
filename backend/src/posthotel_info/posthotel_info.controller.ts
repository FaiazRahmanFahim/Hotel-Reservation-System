import { Controller, Post, Body, Req, UseGuards, Get, Query, NotFoundException, Param, Put, Delete } from '@nestjs/common';
import { PostHotelInfoService } from './posthotel_info.service';
import { CreatePostHotelDTO } from './DTOs/create_posthotel.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdatePostHotelDTO } from './DTOs/update_posthotel.dto';

@Controller('posthotel-info')
@UseGuards(AuthGuard)
export class PostHotelInfoController {

  constructor(private readonly postHotelInfoService: PostHotelInfoService) {}

  @Get('search')
  async searchHotelName(@Query('HotelName') HotelName: string) {
      const hotel = await this.postHotelInfoService.findByHotelName(HotelName);
      if (!hotel) {
          throw new NotFoundException('Hotel not found!');
      }
      return hotel;
  }
  
  @Post()
  async create(@Body() createPostHotelDTO: CreatePostHotelDTO, @Req() req: any) {
    const adminId = req.user.adminID;  // Changed from req.user.sub to req.user.id
    return this.postHotelInfoService.create(createPostHotelDTO, adminId);
  }

  @Get()
  async findAll(@Req() req: any) 
  {
    const adminId = req.user.sub;
    return this.postHotelInfoService.findAll(adminId);
  }

  @Get(':ID')
    async findOne(@Param('ID') ID: any) {
    return this.postHotelInfoService.findOne(ID);
  }

  @Put(':ID')
  async update(@Param('ID') ID: number, @Body() updatePostHotelDTO: UpdatePostHotelDTO) {
    return this.postHotelInfoService.update(ID, updatePostHotelDTO);
  }

  @Delete(':ID')
  async remove(@Param('ID') ID: number) 
  {
    const message = await this.postHotelInfoService.remove(ID);
    return { message };
  }

}
