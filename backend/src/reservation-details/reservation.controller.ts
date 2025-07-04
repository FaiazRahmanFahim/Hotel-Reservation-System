import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateReservationDTO } from './DTOs/create-reservation.dto';
import { UpdateReservationDTO } from './DTOs/update-reservation.dto';
import { ReservationService } from './reservation.service';


@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDTO: CreateReservationDTO) {
    return this.reservationService.create(createReservationDTO);
  }

  @Get()
  async findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateReservationDTO: UpdateReservationDTO) {
    return this.reservationService.update(id, updateReservationDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.reservationService.delete(id);
  }

  //--------------------------------------------dashboard stats--------------------------------------------//
  
    @Get('dashboard/stats')
    async getDashboardStats() {
      return this.reservationService.getDashboardStats();
    }
}
