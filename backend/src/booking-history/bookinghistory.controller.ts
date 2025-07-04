import { Controller, Post, Get, Body, Req, Param, Put } from '@nestjs/common';
import { BookingHistoryService } from './bookinghistory.service';
import { CreateBookingHistoryDTO } from './DTOs/create-bookinghistory.dto';
import { UpdateBookingDTO } from './DTOs/update-booking.dto';


@Controller('booking-history')
export class BookingHistoryController {
  constructor(private readonly bookingHistoryService: BookingHistoryService) {}

  @Post()
  async create(@Body() createBookingHistoryDTO: CreateBookingHistoryDTO) {
    return this.bookingHistoryService.create(createBookingHistoryDTO);
  }

  @Get()
  async findAll() {
    return this.bookingHistoryService.findAll();
  }

  //--------------------------------------------dashboard stats--------------------------------------------//
  
  @Get('dashboard')
  async getDashboardStats() {
    return this.bookingHistoryService.getDashboardStats();
  }

  @Get('revenue')
  async getMonthlyRevenue() {
    const stats = await this.bookingHistoryService.getDashboardStats();
    return stats.monthlyRevenue;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBookingDTO: UpdateBookingDTO) {
    return this.bookingHistoryService.update(id, updateBookingDTO);
  } 

}
