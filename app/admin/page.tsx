"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentBuilder } from "@/components/admin/content-builder";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#003d7a] mb-2">
            நிர்வாக பேனல்
          </h1>
          <p className="text-gray-600">
            புதிய கட்டுரைகளை உருவாக்கி வெளியிடுங்கள்
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          வெளியேறு
        </Button>
      </div>
      
      <ContentBuilder />
    </div>
  );
}