"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/api'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: Date;
  booking: {
    id: number;
    status: string;
    CustomerName: string;
    HotelName: string;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`, {
        withCredentials: true
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <ScrollArea className="h-screen">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Notifications</h2>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Hotel Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <TableRow 
                        key={notification.id}
                        className={notification.isRead ? 'opacity-75' : ''}>
                        <TableCell className="font-medium">
                          {new Date(notification.createdAt).toLocaleDateString()}
                          <div className="text-sm text-gray-500">
                            {new Date(notification.createdAt).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>{notification.message}</TableCell>
                        <TableCell>{notification.booking.HotelName}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                        No notifications found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}