import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDTO } from './DTOs/create-reservation.dto';
import { UpdateReservationDTO } from './DTOs/update-reservation.dto';
import { ReservationDetails } from './Entities/reservationdetails.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationDetails)
    private reservationRepository: Repository<ReservationDetails>,
  ) {}

  async create(createReservationDTO: CreateReservationDTO): Promise<ReservationDetails> {
    const reservation = this.reservationRepository.create(createReservationDTO);
    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<ReservationDetails[]> {
    return await this.reservationRepository.find();
  }

  async findOne(id: number): Promise<ReservationDetails> {
    const reservation = await this.reservationRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDTO: UpdateReservationDTO): Promise<ReservationDetails> {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateReservationDTO);
    return await this.reservationRepository.save(reservation);
  }

  async delete(id: number): Promise<{ message: string }> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
    return { message: `Reservation with ID ${id} deleted successfully.` };
  }

  //--------------------------------------------dashboard stats--------------------------------------------//

  async getDashboardStats() {
    const [totalReservations, totalRevenue, activeReservations] = await Promise.all([
      this.getTotalReservations(),
      this.getTotalRevenue(),
      this.getActiveReservations()
    ]);

    return {
      totalReservations,
      totalRevenue,
      activeReservations
    };
  }

  private async getTotalReservations(): Promise<number> {
    return await this.reservationRepository.count();
  }

  private async getTotalRevenue(): Promise<number> {
    const result = await this.reservationRepository
      .createQueryBuilder('reservation')
      .select('SUM(reservation."Amount")', 'total')
      .where('reservation."paymentStatus" = :status', { status: 'Paid' })
      .getRawOne();
    return Number(result.total) || 0;
  }

  private async getActiveReservations(): Promise<number> {
    return await this.reservationRepository.count({
      where: { reservationStatus: 'Confirmed' }
    });
  }
}
