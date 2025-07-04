"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Menu, 
  LayoutDashboard, 
  Building2, 
  PlusCircle, 
  BookOpen, 
  History, 
  Users2, 
  Bell,
  UserIcon,
  LogOut
} from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { toast } from "sonner"

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hotel List",
    href: "/dashboard/hotels",
    icon: Building2,
  },
  {
    title: "Add Hotel",
    href: "/dashboard/hotels/add",
    icon: PlusCircle,
  },
  {
    title: "Reservation Details",
    href: "/dashboard/reservations",
    icon: BookOpen,
  },
  {
    title: "Booking History",
    href: "/dashboard/bookings",
    icon: History,
  },
  {
    title: "Customer Details",
    href: "/dashboard/customers",
    icon: Users2,
  },
  {
    title: "Notifications",
    href: "/dashboard/notification",
    icon: Bell,
  },
  {
    href: '/dashboard/profile',
    title: 'Profile',
    icon: UserIcon, // Import from lucide-react or your icon library
  },
 
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const router = useRouter();

    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:3000/auth/logout", {}, 
          { withCredentials: true });
        toast.success("Logged out successfully");
        router.push("/login");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to logout");
      }
    };


  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <div className={cn("hidden border-r rounded-lg bg-white lg:block dark:bg-gray-800/40 w-64", className)}>
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span>Hotel Management</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium gap-1">
              {sidebarNavItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                      pathname === item.href && "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 border-t p-4">
            <ModeToggle />
            <Button variant="ghost" 
            onClick={handleLogout}
            size="icon" className="text-red-500">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0 bg-white dark:bg-gray-800/40">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <span>Hotel Management</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-4 text-sm font-medium gap-1">
                {sidebarNavItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                        pathname === item.href && "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div> 
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}