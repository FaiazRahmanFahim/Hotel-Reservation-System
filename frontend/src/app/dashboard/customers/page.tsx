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
import { API_BASE_URL } from "@/lib/api"
import { useEffect, useState } from "react"

interface Customers {
  customerId: string;
  customerName: string;
  fullName: string;
  cus_email: string;
  cus_address: string;
  CContactNumber: string;
  cus_city: string;
  cus_country: string;
  membershipStatus: string;
  verificationStatus: string;
  totalBookings: number;
  totalSpent: number;
  bookingId: string;
  lastBooking: Date;
  roomType: string;
  specialRequests: string;
}

type MembershipTier = 'All' | 'Gold' | 'Silver' | 'Bronze';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<MembershipTier>('All');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Customer`, { withCredentials: true });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handlePrint = () => {
    if (selectedCustomer) {
      const modalContent = document.getElementById('printableArea')?.innerHTML;
      const originalContent = document.body.innerHTML;
      
      document.body.innerHTML = `
        <div style="padding: 20px;">
          <h1 style="text-align: center; margin-bottom: 20px;">Customer Details</h1>
          ${modalContent}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const filteredCustomers = customers.filter(customer => {
    // First apply the search term filter
    const matchesSearch = 
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.cus_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.cus_city.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Then apply the activity type filter
    switch (activeFilter) {
      case 'Gold':
        return customer.membershipStatus === 'Gold';
      case 'Silver':
        return customer.membershipStatus === 'Silver';
      case 'Bronze':
        return customer.membershipStatus === 'Bronze';
      default:
        return true;
    }
  });

  const showDetails = (customer: Customers) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <Card className="border-0 flex-1">
          <CardHeader className="border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>View and manage customer information</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex space-x-2 mt-4">
              <Button
                variant={activeFilter === 'All' ? "default" : "outline"}
                onClick={() => setActiveFilter('All')}
                className={`rounded-full ${
                  activeFilter === 'All'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'}`}>
                All Members
              </Button>
              <Button
                variant={activeFilter === 'Gold' ? "default" : "outline"}
                onClick={() => setActiveFilter('Gold')}
                className={`rounded-full ${
                  activeFilter === 'Gold'
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'}`}>
                Gold Members
              </Button>
              <Button
                variant={activeFilter === 'Silver' ? "default" : "outline"}
                onClick={() => setActiveFilter('Silver')}
                className={`rounded-full ${
                  activeFilter === 'Silver'
                    ? 'bg-gray-400 hover:bg-gray-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'}`}>
                Silver Members
              </Button>
              <Button
                variant={activeFilter === 'Bronze' ? "default" : "outline"}
                onClick={() => setActiveFilter('Bronze')}
                className={`rounded-full ${
                  activeFilter === 'Bronze'
                    ? 'bg-amber-700 hover:bg-amber-800 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'}`}>
                Bronze Members
              </Button>
            </div>
          </CardHeader>

          <ScrollArea className="h-[calc(100vh-230px)]">
            <CardContent className="p-6">
              <Table>
                <TableCaption>A list of all customers and their details</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Total Bookings</TableHead>
                    <TableHead>Total Spent</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow 
                      key={customer.customerId}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => showDetails(customer)}
                    >
                      <TableCell className="font-medium">{customer.customerName}</TableCell>
                      <TableCell>{customer.cus_email}</TableCell>
                      <TableCell>{customer.cus_city}</TableCell>
                      <TableCell>{customer.cus_country}</TableCell>
                      <TableCell>{customer.membershipStatus}</TableCell>
                      <TableCell>{customer.totalBookings}</TableCell>
                      <TableCell>${customer.totalSpent}</TableCell>
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
                  <DialogTitle>{selectedCustomer?.customerName}</DialogTitle>
                  <DialogDescription>Customer Details</DialogDescription>
                </div>
                <Button onClick={handlePrint} variant="outline" size="icon" className="mr-4">
                  <Printer className="h-4 w-5" />
                </Button>
              </div>
            </DialogHeader>
            <div id="printableArea">
              {selectedCustomer && (
                <div className="grid grid-cols-2 gap-6">
                  <DetailItem label="Customer ID" value={selectedCustomer.customerId} />
                  <DetailItem label="Full Name" value={selectedCustomer.fullName} />
                  <DetailItem label="Email" value={selectedCustomer.cus_email} />
                  <DetailItem label="Contact" value={selectedCustomer.CContactNumber} />
                  <DetailItem label="Address" value={selectedCustomer.cus_address} />
                  <DetailItem label="City" value={selectedCustomer.cus_city} />
                  <DetailItem label="Country" value={selectedCustomer.cus_country} />
                  <DetailItem label="Membership Status" value={selectedCustomer.membershipStatus} />
                  <DetailItem label="Verification Status" value={selectedCustomer.verificationStatus} />
                  <DetailItem label="Total Bookings" value={selectedCustomer.totalBookings.toString()} />
                  <DetailItem label="Total Spent" value={`$${selectedCustomer.totalSpent}`} />
                  <DetailItem label="Last Booking" value={new Date(selectedCustomer.lastBooking).toLocaleDateString()} />
                  <DetailItem label="Room Type" value={selectedCustomer.roomType} />
                  <div className="col-span-2">
                    <DetailItem label="Special Requests" value={selectedCustomer.specialRequests} />
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