"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  HiOutlineUsers, 
  HiOutlineCurrencyDollar,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiOutlineCalendar,
} from 'react-icons/hi'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  totalHotels: number;
  reservationStats: {
    totalReservations: number;
    totalRevenue: number;
    activeReservations: number;
  };
}

const COLORS = ['#22c55e', '#3b82f6'];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalHotels: 0,
    reservationStats: {
      totalReservations: 0,
      totalRevenue: 0,
      activeReservations: 0
    }
  })

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [bookingResponse, reservationResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/booking-history/dashboard`, {
            withCredentials: true
          }),
          axios.get(`${API_BASE_URL}/reservation/dashboard/stats`, {
            withCredentials: true
          })
        ]);

        setStats({
          ...bookingResponse.data,
          reservationStats: reservationResponse.data
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      }
    }

    fetchAllStats()
  }, [])

  return (
    <div className="h-[calc(100vh-100px)]">
    <div className="rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
    <ScrollArea className="h-screen">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-500">Welcome to your hotel management dashboard</p>
        </div>

        <div className="space-y-6">
          {/* Booking Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Booking Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiOutlineCurrencyDollar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500">Total Revenue</p>
                    <h4 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h4>
                    <p className="text-green-500 text-sm">+20.1% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <HiOutlineCalendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500">Bookings</p>
                    <h4 className="text-2xl font-bold">{stats.totalBookings}</h4>
                    <p className="text-green-500 text-sm">+180.1% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HiOutlineUsers className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500">Customers</p>
                    <h4 className="text-2xl font-bold">{stats.totalCustomers}</h4>
                    <p className="text-green-500 text-sm">+19% from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reservation Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HiOutlineClipboardList className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500">Total Reservations</p>
                    <h4 className="text-2xl font-bold">{stats.reservationStats.totalReservations}</h4>
                    <p className="text-green-500 text-sm">+15% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <HiOutlineClipboardCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500">Active Reservations</p>
                    <h4 className="text-2xl font-bold">{stats.reservationStats.activeReservations}</h4>
                    <p className="text-green-500 text-sm">+8% from last month</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HiOutlineCurrencyDollar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500">Reservation Revenue</p>
                    <h4 className="text-2xl font-bold">${stats.reservationStats.totalRevenue.toLocaleString()}</h4>
                    <p className="text-green-500 text-sm">+25% from last month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Distribution */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Reservation Distribution</h3>
            <div className="bg-white rounded-lg p-6 shadow-sm max-w-sm">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Active Reservations', value: stats.reservationStats.activeReservations },
                        { name: 'Completed Reservations', value: stats.reservationStats.totalReservations - stats.reservationStats.activeReservations }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
    </div>
    </div>
  )
}