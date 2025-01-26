"use client";
import { fetchWithAuth } from '@/utils/api';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusCircle, LogIn } from "lucide-react";

interface JournalCode {
  code: string;
  topic: string;
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [journalCode, setJournalCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchWithAuth('/api/user/profile');
        const data = await response.json();
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Profile fetch error:', error);
        router.push('/auth/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  const createJournalCode = async () => {
    setError("");
    try {
      const response = await fetchWithAuth("/api/journal/create-code", {
        method: "POST"
      });

      const data: JournalCode = await response.json();
      router.push(`/journal/${data.code}`);
    } catch (error) {
      console.error("Error creating journal code:", error);
      setError("Failed to create journal. Please try again.");
    }
  };

  const joinJournalCode = async () => {
    setError("");
    try {
      const response = await fetchWithAuth("/api/journal/join-code", {
        method: "POST",
        body: JSON.stringify({ code: journalCode })
      });

      const data = await response.json();
      router.push(`/journal/${data.code}`);
    } catch (error) {
      console.error("Error joining journal:", error);
      setError("Failed to join journal. Check the code and try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Welcome, {user.username}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

          <Button 
            onClick={createJournalCode} 
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2" /> Create New Journal
          </Button>

          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter Journal Code"
              value={journalCode}
              onChange={(e) => setJournalCode(e.target.value.toUpperCase())}
              className="flex-grow uppercase tracking-wider"
              maxLength={6}
            />
            <Button
              onClick={joinJournalCode}
              disabled={journalCode.length !== 6}
              className="bg-green-600 hover:bg-green-700 transition-colors"
            >
              <LogIn className="mr-2" /> Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
