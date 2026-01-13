"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (replace with your actual auth logic)
    if (credentials.username === "editor" && credentials.password === "tamil123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin");
    } else {
      alert("தவறான பயனர் பெயர் அல்லது கடவுச்சொல்");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#003d7a] text-center">
            நிர்வாக உள்நுழைவு
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">பயனர் பெயர்</Label>
              <Input
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="பயனர் பெயர்"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">கடவுச்சொல்</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="கடவுச்சொல்"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#e60000] hover:bg-[#cc0000]">
              உள்நுழைய
            </Button>
          </form>
          
          <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
            <p><strong>டெமோ அணுகல்:</strong></p>
            <p>பயனர்: editor</p>
            <p>கடவுச்சொல்: tamil123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}