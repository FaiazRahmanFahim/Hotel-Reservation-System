import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingHistory } from './Entities/bookinghistory.entity';
import { CreateBookingHistoryDTO } from './DTOs/create-bookinghistory.dto';
import { DashboardStatsDTO, MonthlyRevenueDTO } from './DTOs/dashboard-stats.dto';
import { NotificationService } from 'src/notification/notification.servise';
import { UpdateBookingDTO } from './DTOs/update-booking.dto';



@Injectable()
export class BookingHistoryService {
  constructor(
    @InjectRepository(BookingHistory)
    private bookingHistoryRepository: Repository<BookingHistory>,
    private notificationService: NotificationService
  ) {}

  async create(createBookingHistoryDTO: CreateBookingHistoryDTO): Promise<BookingHistory> {
    const booking = this.bookingHistoryRepository.create(createBookingHistoryDTO);
    const savedBooking = await this.bookingHistoryRepository.save(booking);
    
    // Create notification after saving the booking
    await this.notificationService.createBookingNotification(savedBooking);
    
    return savedBooking;
  }

  async findAll(): Promise<BookingHistory[]> {
    return await this.bookingHistoryRepository.find();
  }

  //--------------------------------------------dashboard stats--------------------------------------------//

  private async getTotalBookings(): Promise<number> {
    return await this.bookingHistoryRepository.count();
  }

  private async getTotalRevenue(): Promise<number> {
    const result = await this.bookingHistoryRepository
      .createQueryBuilder('booking')
      .select('SUM(booking."Amount")', 'total')
      .getRawOne();
    return Number(result.total) || 0;
  }

  private async getTotalCustomers(): Promise<number> {
    const result = await this.bookingHistoryRepository
      .createQueryBuilder('booking')
      .select('COUNT(DISTINCT booking."customerId")', 'count')
      .getRawOne();
    return Number(result.count) || 0;
  }

  private async getMonthlyRevenue(): Promise<MonthlyRevenueDTO[]> {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().slice(0, 7);
    }).reverse();

    const revenue = await this.bookingHistoryRepository
      .createQueryBuilder('booking')
      .select("TO_CHAR(booking.\"bookingDate\"::date, 'YYYY-MM')", 'month')
      .addSelect('SUM(booking."Amount")', 'revenue')
      .where('booking."bookingDate"::date >= :startDate', { 
        startDate: `${last6Months[0]}-01` 
      })
      .groupBy("TO_CHAR(booking.\"bookingDate\"::date, 'YYYY-MM')")
      .getRawMany();

    return last6Months.map(month => ({
      month,
      revenue: Number(revenue.find(r => r.month === month)?.revenue || 0)
    }));
  }

  async getDashboardStats(): Promise<DashboardStatsDTO> {
    const [
      totalBookings,
      totalRevenue,
      totalCustomers,
      monthlyRevenue
    ] = await Promise.all([
      this.getTotalBookings(),
      this.getTotalRevenue(),
      this.getTotalCustomers(),
      this.getMonthlyRevenue()
    ]);

    return {
      totalBookings,
      totalRevenue,
      totalCustomers,
      monthlyRevenue
    };
  }

  async update(id: number, updateBookingDTO: UpdateBookingDTO): Promise<BookingHistory> {
    const booking = await this.bookingHistoryRepository.findOne({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return await this.bookingHistoryRepository.save({ ...booking, ...UpdateBookingDTO });
  } 
}
