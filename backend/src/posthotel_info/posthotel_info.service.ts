import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostHotelInfo } from './Entities/posthotel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostHotelDTO } from './DTOs/create_posthotel.dto';
import { UpdatePostHotelDTO } from './DTOs/update_posthotel.dto';

@Injectable()
export class PostHotelInfoService {

  constructor(
    
    @InjectRepository(PostHotelInfo)
    private postHotelInfoRepository: Repository<PostHotelInfo>
  ) {}

  async create(createPostHotelDTO: CreatePostHotelDTO, adminId: number): Promise<PostHotelInfo> {
    const hotelInfo = this.postHotelInfoRepository.create({
      ...createPostHotelDTO,
      adminID: adminId
    });  
    return await this.postHotelInfoRepository.save(hotelInfo);
  }

  async findByHotelName(HotelName: string): Promise<PostHotelInfo|null> {
    return await this.postHotelInfoRepository
      .createQueryBuilder('PostHotel_Info')
      .where('PostHotel_Info.HotelName ILIKE :HotelName', { HotelName: `%${HotelName}%` })
      .getOne();
  }


  async findAll(adminId: number): Promise<PostHotelInfo[]> {
    return await this.postHotelInfoRepository.find({
      where: { adminID: adminId }
    });
  }

  async findOne(ID: number): Promise<PostHotelInfo> {
    const hotel = await this.postHotelInfoRepository.findOne({ where: { ID } });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async update(ID: number, updatePostHotelDTO: UpdatePostHotelDTO): Promise<PostHotelInfo> {
    const hotelInfo = await this.postHotelInfoRepository.findOne({ where: { ID } });
    if (!hotelInfo) {
      throw new NotFoundException('Hotel not found');
    }
    return await this.postHotelInfoRepository.save({ ...hotelInfo, ...updatePostHotelDTO });
  }

  async remove(ID: number): Promise<string> {
    const hotel = await this.findOne(ID); 

    if (!hotel) {
      throw new BadRequestException('Hotel not found');
    }
    await this.postHotelInfoRepository.remove(hotel); 
    return `Successfully deleted hotel with ID: ${ID}`; 
  }
  
}
