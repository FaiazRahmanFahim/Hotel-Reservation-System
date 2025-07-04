import { Controller, Get, Patch, Post, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.servise';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService
  ) {}

  @Get()
  getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Get('unread')
  getUnreadNotifications() {
    return this.notificationService.getUnreadNotifications();
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: number) {
    return this.notificationService.markAsRead(id);
  }

  @Post('mark-all-read')
  markAllAsRead() {
    return this.notificationService.markAllAsRead();
  }

}