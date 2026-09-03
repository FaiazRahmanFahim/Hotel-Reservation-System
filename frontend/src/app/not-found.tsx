import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-center">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
        Page Not Found
      </h2>
      <p className="max-w-md text-gray-600 dark:text-gray-400 mb-8 text-sm">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/dashboard">
        <Button className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
