"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"

interface HotelFormData {
  HotelName: string;
  HotelSerialNo: string;
  roomType: string;
  email: string;
  Price: number;
  Address: string;
  City: string;
  Country: string;
  WebSite: string;
  Description: string;
  NumberOfRoom: number;
  ContactNumber: string;
}

export default function EditHotelPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<HotelFormData>();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posthotel-info/${id}`, {
          withCredentials: true
        });
        reset(response.data); // Pre-fill the form with existing data
      } catch {
        setError('Failed to fetch hotel details');
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id, reset]);

  const onSubmit = async (data: HotelFormData) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.put(
        `${API_BASE_URL}/posthotel-info/${id}`,
        data,
        { withCredentials: true }
      )
    
      if (response.status === 200) {
        router.push('/dashboard/hotels')
        router.refresh()
      } else {
        setError("Failed to update hotel")
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to update hotel')
      } else {
        setError('Failed to update hotel')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <div className="flex items-center p-6 border-b bg-white">
          <Link 
            href="/dashboard/hotels" 
            className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Edit Hotel
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="w-1/2 align-top">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="HotelName">Hotel Name *</Label>
                        <Input 
                          {...register("HotelName", { 
                            required: "Hotel name is required" 
                          })} 
                          placeholder="Enter hotel name" 
                        />
                        {errors.HotelName && (
                          <p className="text-sm text-red-500">{errors.HotelName.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="HotelSerialNo">Hotel Serial No *</Label>
                        <Input
                          {...register("HotelSerialNo", {
                            required: "Hotel Serial No Can not be Empty!"
                          })} 
                          placeholder="Enter hotel serial number" 
                        />
                        {errors.HotelSerialNo && (
                          <p className="text-sm text-red-500">{errors.HotelSerialNo.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="City">City *</Label>
                        <Input 
                          {...register("City", {
                            required: "City Can not be Empty!"
                          })} 
                          placeholder="Enter city" 
                        />
                        {errors.City && (
                          <p className="text-sm text-red-500">{errors.City.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ContactNumber">Contact Number *</Label>
                        <Input 
                          {...register("ContactNumber", {
                            required: "Contact Number Can not be Empty!"
                          })} 
                          placeholder="Enter contact number" 
                        />
                        {errors.ContactNumber && (
                          <p className="text-sm text-red-500">{errors.ContactNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="NumberOfRoom">Total Rooms *</Label>
                        <Input
                          {...register("NumberOfRoom", {
                            required: "Total Rooms Can not be Empty!",
                            valueAsNumber: true
                          })} 
                          placeholder="Enter total rooms" 
                          type="number" 
                        />
                        {errors.NumberOfRoom && (
                          <p className="text-sm text-red-500">{errors.NumberOfRoom.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Price">Price Per Night *</Label>
                        <Input 
                          {...register("Price", { 
                            required: "Price is required",
                            valueAsNumber: true 
                          })}
                          type="number"
                          placeholder="Enter price" 
                        />
                        {errors.Price && (
                          <p className="text-sm text-red-500">{errors.Price.message}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="w-1/2 align-top">
                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="roomType">Hotel Category *</Label>
                        <Controller
                          name="roomType"
                          control={control}
                          rules={{ required: "Category is required" }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="luxury">Luxury</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="resort">Resort</SelectItem>
                                <SelectItem value="boutique">Boutique</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.roomType && (
                          <p className="text-sm text-red-500">{errors.roomType.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Address">Address *</Label>
                        <Input 
                          {...register("Address", { 
                            required: "Address is required" 
                          })}
                          placeholder="Enter complete address" 
                        />
                        {errors.Address && (
                          <p className="text-sm text-red-500">{errors.Address.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Country">Country *</Label>
                        <Input  
                          {...register("Country", { 
                            required: "Country is required" 
                          })}
                          placeholder="Enter country" 
                        />
                        {errors.Country && (
                          <p className="text-sm text-red-500">{errors.Country.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          {...register("email", {
                            required: "Enter Valid email",
                          })}  
                          placeholder="Enter email" 
                          type="email" 
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="WebSite">Website</Label>
                        <Input {...register("WebSite")} placeholder="Enter website URL" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={2}>
                    {/* Full Width Description */}
                    <div className="space-y-2">
                      <Label htmlFor="Description">Description</Label>
                      <Textarea 
                        {...register("Description")} 
                        placeholder="Enter hotel description" 
                      />
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="p-6 border-t bg-white">
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}