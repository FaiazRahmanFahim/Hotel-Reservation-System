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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm , Controller} from "react-hook-form"
import axios from "axios"


export default function AddHotelPage() {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmitted = async (data: any) => {
    setIsLoading(true)
    setError("")
    // double check type of input data before sending

    try {
      const Rresponse = await axios.post("http://localhost:3000/posthotel-info",data, { withCredentials: true})
    
      if (Rresponse.status === 201) {
        reset()
        router.push('/dashboard/hotels')
      }
      else{
        alert("Something went wrong");
      }
    } catch (err: any) {
      setError('Failed to add hotel')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden flex flex-col">
        <div className="flex items-center p-6 border-b bg-white">
          <Link 
            href="/dashboard/hotels" 
            className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Add New Hotel
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit(onSubmitted)}>
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
                          <p className="text-sm text-red-500">{errors.HotelName.message?.toString()}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="HotelSerialNo">Hotel Serial No *</Label>
                      <Input
                      {...register("HotelSerialNo", {
                        required:"Hotel Serial No Can not be Empty!"
                        })} 
                       placeholder="Enter hotel serial number" />
                       {errors.HotelSerialNo && (
                          <p className="text-sm text-red-500">{errors.HotelSerialNo.message?.toString()}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="City">City *</Label>
                      <Input 
                      {...register("City", {
                        required:"City Can not be Empty!"
                        })} 
                        placeholder="Enter city" />
                       {errors.City && (
                          <p className="text-sm text-red-500">{errors.City.message?.toString()}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ContactNumber">Contact Number *</Label>
                      <Input 
                      {...register("ContactNumber", {
                        required:"Contact Number Can not be Empty!"
                        })} 
                        placeholder="Enter contact number" />
                       {errors.ContactNumber && (
                          <p className="text-sm text-red-500">{errors.ContactNumber.message?.toString()}</p>
                        )} 
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="NumberOfRoom">Total Rooms *</Label>
                      <Input
                       {...register("NumberOfRoom", {
                        required:"Total Rooms Can not be Empty!",
                        valueAsNumber: true
                        })} 
                        placeholder="Enter total rooms" type="number" />
                       {errors.NumberOfRoom && (
                          <p className="text-sm text-red-500">{errors.NumberOfRoom.message?.toString()}</p>
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
                        placeholder="Enter price" />
                        {errors.Price && (
                          <p className="text-sm text-red-500">{errors.Price.message?.toString()}</p>
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
                          <p className="text-sm text-red-500">{errors.roomType.message?.toString()}</p>
                        )}
                      {/* {errors.Category && <p className="text-sm text-red-500">{errors.Category.message}</p>} */}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="Address">Address *</Label>
                      <Input 
                      {...register("Address", { 
                        required: "Address is required" 
                      })}
                      placeholder="Enter complete address" />
                      {errors.Address && (
                        <p className="text-sm text-red-500">{errors.Address.message?.toString()}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="Country">Country *</Label>
                      <Input  
                      {...register("Country", { 
                        required: "Country is required" 
                      })}
                      placeholder="Enter country" />
                      {errors.Country && (
                        <p className="text-sm text-red-500">{errors.Country.message?.toString()}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input {...register("email", {
                        required:"Enter Valid email",
                      })}  
                      placeholder="Enter email" type="email" />
                       {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message?.toString()}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="WebSite">Website</Label>
                      <Input {...register("WebSite")}  placeholder="Enter website URL" />
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
                    placeholder="Enter hotel description" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="p-6 border-t bg-white">
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={()=>{reset()}}>Refresh</Button>
            <Button
              className="cursor-pointer"
              type="submit" 
              disabled={isLoading}>
              {isLoading ? "Adding new Hotel Inf..." : "Save Hotel"}
            </Button>
          </div>
          </div>
          </form> 
        </div>  
      </div>
    </div>
  )
}