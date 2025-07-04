"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { 
  Pencil, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building2, 
  Globe,
  User 
} from "lucide-react"
import { useRouter } from "next/navigation"

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

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin-profile",
        { withCredentials: true }
      );
      
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Please login to view your profile");
        router.push('/login');
      } else {
        toast.error("Failed to load profile");
        console.error("Error fetching profile:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value?: string }) => (
    <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
      <div className="mt-0.5">
        <Icon className="h-5 w-5 text-gray-500" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value || 'Not provided'}</p>
      </div>
    </div>
  );

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
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </div>
            <Button
              onClick={() => router.push('/dashboard/profile/edit')}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100">
                {profile?.profilePicture ? (
                  <img 
                    src={profile.profilePicture} 
                    alt={profile.fullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {profile?.fullName || profile?.username || 'No name provided'}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1 text-gray-500">
                  <Mail className="h-4 w-4" />
                  <p className="text-sm">{profile?.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem 
                icon={Phone} 
                label="Phone Number" 
                value={profile?.phoneNumber} 
              />
              <InfoItem 
                icon={MapPin} 
                label="Address" 
                value={profile?.address} 
              />
              <InfoItem 
                icon={Building2} 
                label="City" 
                value={profile?.city} 
              />
              <InfoItem 
                icon={Globe} 
                label="Country" 
                value={profile?.country} 
              />
              <InfoItem 
                icon={Calendar} 
                label="Date of Birth" 
                value={profile?.dateOfBirth ? 
                  new Date(profile.dateOfBirth).toLocaleDateString() : 
                  undefined
                } 
              />
              <InfoItem 
                icon={User} 
                label="Username" 
                value={profile?.username} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}