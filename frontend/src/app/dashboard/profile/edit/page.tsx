"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { toast } from "sonner"
import { 
  ArrowLeft,
  Loader2, 
  Upload,
  User,
  Phone,
  MapPin,
  Building2,
  Globe,
  Calendar
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"

interface AdminProfile {
  adminID: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  profilePicture: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [formData, setFormData] = useState<Partial<AdminProfile>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        toast.error("Please login to continue");
        router.push('/login');
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error("Error:", error);
      }
    } else {
      toast.error("An unexpected error occurred");
    }
  }, [router]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin-profile",
        { withCredentials: true });
        
      if (response.data) {
        setProfile(response.data);
        setFormData(response.data);
        if (response.data.profilePicture) {
          setPreviewUrl(response.data.profilePicture);
        }
      }
    } catch (error: unknown) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { 
        toast.error("File size should be less than 10MB");
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile || !profile?.adminID) return;
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    try {
      await axios.post(`http://localhost:3000/admin-profile/upload-picture`,
        formData,
        {withCredentials: true }
      );
      toast.success("Profile picture updated successfully");
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.adminID) {
      toast.error("Profile ID not found");
      return;
    }

    setIsSaving(true);
    try {
      
      await axios.put(`http://localhost:3000/admin-profile/${profile.adminID}`,
        formData,
        { withCredentials: true }
      );

      if (selectedFile) {
        await uploadProfilePicture();
      }

      toast.success("Profile updated successfully");
      router.push('/dashboard/profile');
    } catch (error) {
      handleError(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard/profile')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="profile-picture"
                />
                <Label
                  htmlFor="profile-picture"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80"
                >
                  <Upload className="h-4 w-4" />
                  Change Picture
                </Label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleInputChange}
                    className="pl-9"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={handleInputChange}
                    className="pl-9"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    className="pl-9"
                    placeholder="Enter address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    className="pl-9"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Country</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    name="country"
                    value={formData.country || ''}
                    onChange={handleInputChange}
                    className="pl-9"
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/profile')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="min-w-[120px]"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}