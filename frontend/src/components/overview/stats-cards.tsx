import { Card } from 'flowbite-react';
import { HiOutlineUsers, HiOutlineOfficeBuilding, HiOutlineCalendar, HiOutlineCurrencyDollar } from 'react-icons/hi';

interface StatsCardsProps {
  stats: {
    totalBookings: number
    totalRevenue: number
    totalCustomers: number
    totalHotels: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <div className="flex items-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <HiOutlineCurrencyDollar className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
            <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600">+20.1% from last month</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <HiOutlineCalendar className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Bookings</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
            <p className="text-sm text-green-600">+180.1% from last month</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <HiOutlineUsers className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Customers</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalCustomers}</p>
            <p className="text-sm text-green-600">+19% from last month</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
            <HiOutlineOfficeBuilding className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Hotels</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalHotels}</p>
            <p className="text-sm text-green-600">+201 since last hour</p>
          </div>
        </div>
      </Card>
    </div>
  )
}