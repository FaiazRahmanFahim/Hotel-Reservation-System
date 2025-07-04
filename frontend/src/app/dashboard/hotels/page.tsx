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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Hotels {
    ID: number,
    HotelName: string,
    HotelSerialNo: string,
    roomType: string,
    email: string,
    Price: number,
    Availability: string,
    Address: string,
    City: string,
    Country: string,
    WebSite: string,
    Description: string,
    NumberOfRoom: number,
    ContactNumber: string,
    createdAt: string,
    adminID: number
}

export default function HotelList() {
  const [hotels, setHotels] = useState<Hotels[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotels | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posthotel-info", {
        withCredentials: true
      });
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this hotel?")) {
      try {
        await axios.delete(`http://localhost:3000/posthotel-info/${id}`, {
          withCredentials: true
        });
        fetchHotels();
      } catch (error) {
        console.error("Error deleting hotel:", error);
      }
    }
  };

  const handleEdit = (hotel: Hotels) => {
    router.push(`/dashboard/hotels/edit/${hotel.ID}`);
  };

  const showDetails = (hotel: Hotels) => {
    setSelectedHotel(hotel);
    setIsDetailModalOpen(true);
  };

  const filteredHotels = hotels.filter(hotel => 
    hotel.HotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.Country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <Card className="border-0 flex-1">
          <CardHeader className="border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Hotel List</CardTitle>
                <CardDescription>Manage and view all hotel properties</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search hotels..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-230px)]">
            <CardContent className="p-6">
              {/* Mobile/Tablet View */}
              <div className="md:hidden">
                {filteredHotels.map((hotel) => (
                  <Card key={hotel.ID} className="mb-4">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{hotel.HotelName}</h3>
                        <ActionMenu hotel={hotel} onEdit={handleEdit} onDelete={handleDelete} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <strong>Price:</strong>
                          <span>${hotel.Price}</span>
                        </div>
                        <div className="flex justify-between">
                          <strong>City:</strong>
                          <span>{hotel.City}</span>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full mt-2"
                          onClick={() => showDetails(hotel)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <Table>
                  <TableCaption>List of Hotels</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Rooms</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHotels.map((hotel) => (
                      <TableRow 
                        key={hotel.ID} 
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => showDetails(hotel)}
                      >
                        <TableCell>{hotel.HotelName}</TableCell>
                        <TableCell>${hotel.Price}</TableCell>
                        <TableCell>{hotel.City}</TableCell>
                        <TableCell>{hotel.NumberOfRoom}</TableCell>
                        <TableCell>{hotel.ContactNumber}</TableCell>
                        <TableCell className="text-right">
                          <ActionMenu 
                            hotel={hotel} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Detail Modal */}
              <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{selectedHotel?.HotelName}</DialogTitle>
                    <DialogDescription>Hotel Details</DialogDescription>
                  </DialogHeader>
                  {selectedHotel && (
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="Serial No" value={selectedHotel.HotelSerialNo} />
                      <DetailItem label="Room Type" value={selectedHotel.roomType} />
                      <DetailItem label="Email" value={selectedHotel.email} />
                      <DetailItem label="Price" value={`$${selectedHotel.Price}`} />
                      <DetailItem label="Availability" value={selectedHotel.Availability} />
                      <DetailItem label="Address" value={selectedHotel.Address} />
                      <DetailItem label="City" value={selectedHotel.City} />
                      <DetailItem label="Country" value={selectedHotel.Country} />
                      <DetailItem label="Website" value={selectedHotel.WebSite} />
                      <DetailItem label="Contact" value={selectedHotel.ContactNumber} />
                      <DetailItem label="Number of Rooms" value={selectedHotel.NumberOfRoom.toString()} />
                      <DetailItem label="Created At" value={new Date(selectedHotel.createdAt).toLocaleDateString()} />
                      <div className="col-span-2">
                        <DetailItem label="Description" value={selectedHotel.Description} />
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}

// Helper Components
const ActionMenu = ({ hotel, onEdit, onDelete }: { 
  hotel: Hotels, 
  onEdit: (hotel: Hotels) => void, 
  onDelete: (id: number) => void 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          onEdit(hotel);
        }}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(hotel.ID);
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const DetailItem = ({ label, value }: { label: string, value: string }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
};