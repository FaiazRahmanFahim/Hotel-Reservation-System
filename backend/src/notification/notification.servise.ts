import { Body, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingHistory } from 'src/booking-history/Entities/bookinghistory.entity';
import { Repository } from 'typeorm';
import { Notification } from './Entities/notification.entity';


@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createBookingNotification(booking: BookingHistory) {
    const notification = this.notificationRepository.create({
      message: `New booking request from ${booking.customerName} for ${booking.HotelName}`,
      bookingId: booking.id,
      isRead: false,
    });
    return await this.notificationRepository.save(notification);
  }

  async getUnreadNotifications() {
    return await this.notificationRepository.find({
      where: { isRead: false },
      order: { createdAt: 'DESC' },
      relations: ['booking'],
    });
  }

  async getAllNotifications() {
    return await this.notificationRepository.find({
      order: { createdAt: 'DESC' },
      relations: {
        booking: true
      },
      select: {
        booking: {
          id: true,
          bookingStatus: true,
          customerName: true,
          HotelName: true
        }
      }
    });
  }

  async markAsRead(id: number) {
    await this.notificationRepository.update(id, { isRead: true });
  }

  async markAllAsRead() {
    await this.notificationRepository.update({ isRead: false }, { isRead: true });
  }

}