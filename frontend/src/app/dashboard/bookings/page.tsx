"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Printer } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios"
import { useEffect, useState } from "react"

interface BookingHistory {
  bookingId: string;
  HotelSerialNo: string;
  customerName: string;
  HotelName: string;
  cus_checkIn: Date;
  cus_checkOut: Date;
  Amount: number;
  paymentStatus: string;
  bookingStatus: string;
  customerId: string;
  fullName: string;
  cus_email: string;
  roomType: string;
  CContactNumber: string;
  roomNumber: string;
  bookingDate: string;
  paymentMethod: string;
  paymentDate: string;
}

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<BookingHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingHistory | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/booking-history", {
        withCredentials: true
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handlePrint = () => {
    if (selectedBooking) {
      const modalContent = document.getElementById('printableArea')?.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div style="padding: 20px;">
          <h1 style="text-align: center; margin-bottom: 20px;">Booking Details</h1>
          ${modalContent}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContent;
      // Re-initialize your React app
      window.location.reload();
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.HotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <Card className="border-0 flex-1">
          <CardHeader className="border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>View all booking details and history</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-230px)]">
            <CardContent className="p-6">
              <Table>
                <TableCaption>A list of all bookings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow 
                      key={booking.bookingId}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setIsDetailModalOpen(true);
                      }}
                    >
                      <TableCell className="font-medium">{booking.bookingId}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.HotelName}</TableCell>
                      <TableCell>{new Date(booking.cus_checkIn).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(booking.cus_checkOut).toLocaleDateString()}</TableCell>
                      <TableCell>${booking.Amount}</TableCell>
                      <TableCell>{booking.bookingStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </ScrollArea>
        </Card>

        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-3xl">
            <div className="absolute right-4 top-4 flex gap-2">
            <Button onClick={handlePrint} variant="outline" size="icon" className="mr-6">
                <Printer className="h-4 w-5" />
            </Button>
            </div>
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>Booking ID: {selectedBooking?.bookingId}</DialogDescription>
            </DialogHeader>
            <div id="printableArea">
              {selectedBooking && (
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Hotel Name" value={selectedBooking.HotelName} />
                  <DetailItem label="Customer Name" value={selectedBooking.customerName} />
                  <DetailItem label="Check In" value={new Date(selectedBooking.cus_checkIn).toLocaleDateString()} />
                  <DetailItem label="Check Out" value={new Date(selectedBooking.cus_checkOut).toLocaleDateString()} />
                  <DetailItem label="Amount" value={`$${selectedBooking.Amount}`} />
                  <DetailItem label="Payment Status" value={selectedBooking.paymentStatus} />
                  <DetailItem label="Booking Status" value={selectedBooking.bookingStatus} />
                  <DetailItem label="Room Type" value={selectedBooking.roomType} />
                  <DetailItem label="Room Number" value={selectedBooking.roomNumber} />
                  <DetailItem label="Payment Method" value={selectedBooking.paymentMethod} />
                  <DetailItem label="Payment Date" value={selectedBooking.paymentDate} />
                  <DetailItem label="Contact" value={selectedBooking.CContactNumber} />
                  <DetailItem label="Email" value={selectedBooking.cus_email} />
                  <DetailItem label="Booking Date" value={selectedBooking.bookingDate} />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

const DetailItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
};