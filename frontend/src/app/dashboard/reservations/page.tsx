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

interface Reservation {
  customerName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  Amount: number;
  paymentStatus: string;
  bookingStatus: string;
  cus_email: string;
  phone: string;
  roomNumber: string;
  adults: number;
  children: number;
  reservationStatus: string;
  hotelName: string;
  specialRequests: string;
  paymentMethod: string;
  bookingDate: string;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/reservation", { withCredentials: true });
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handlePrint = () => {
    if (selectedReservation) {
      const modalContent = document.getElementById('printableArea')?.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div style="padding: 20px;">
          <h1 style="text-align: center; margin-bottom: 20px;">Reservation Details</h1>
          ${modalContent}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const filteredReservations = reservations.filter(reservation => 
    reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.reservationStatus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <Card className="border-0 flex-1">
          <CardHeader className="border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Reservations List</CardTitle>
                <CardDescription>View and manage reservation information</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search reservations..."
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
                <TableCaption>A list of all reservations and their details</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation, index) => (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => showDetails(reservation)}
                    >
                      <TableCell className="font-medium">{reservation.customerName}</TableCell>
                      <TableCell>{reservation.roomNumber}</TableCell>
                      <TableCell>{new Date(reservation.checkIn).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(reservation.checkOut).toLocaleDateString()}</TableCell>
                      <TableCell>{reservation.reservationStatus}</TableCell>
                      <TableCell>{reservation.paymentStatus}</TableCell>
                      <TableCell>${reservation.Amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <div>
                  <DialogTitle>{selectedReservation?.customerName}</DialogTitle>
                  <DialogDescription>Reservation Details</DialogDescription>
                </div>
                <Button onClick={handlePrint} variant="outline" size="icon" className="mr-4">
                  <Printer className="h-4 w-5" />
                </Button>
              </div>
            </DialogHeader>
            <div id="printableArea">
              {selectedReservation && (
                <div className="grid grid-cols-2 gap-6">
                  <DetailItem label="Guest Name" value={selectedReservation.customerName} />
                  <DetailItem label="Email" value={selectedReservation.cus_email} />
                  <DetailItem label="Phone" value={selectedReservation.phone} />
                  <DetailItem label="Hotel Name" value={selectedReservation.hotelName} />
                  <DetailItem label="Room Type" value={selectedReservation.roomType} />
                  <DetailItem label="Room Number" value={selectedReservation.roomNumber} />
                  <DetailItem label="Check In" value={new Date(selectedReservation.checkIn).toLocaleDateString()} />
                  <DetailItem label="Check Out" value={new Date(selectedReservation.checkOut).toLocaleDateString()} />
                  <DetailItem label="Adults" value={selectedReservation.adults.toString()} />
                  <DetailItem label="Children" value={selectedReservation.children.toString()} />
                  <DetailItem label="Amount" value={`$${selectedReservation.Amount}`} />
                  <DetailItem label="Payment Method" value={selectedReservation.paymentMethod} />
                  <DetailItem label="Payment Status" value={selectedReservation.paymentStatus} />
                  <DetailItem label="Booking Status" value={selectedReservation.bookingStatus} />
                  <DetailItem label="Reservation Status" value={selectedReservation.reservationStatus} />
                  <DetailItem label="Booking Date" value={new Date(selectedReservation.bookingDate).toLocaleDateString()} />
                  <div className="col-span-2">
                    <DetailItem label="Special Requests" value={selectedReservation.specialRequests} />
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Helper Component
const DetailItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
};