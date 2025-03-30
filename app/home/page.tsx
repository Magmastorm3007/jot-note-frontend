"use client";

import { fetchWithAuth } from "@/utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, PlusCircle, LogIn } from "lucide-react";

interface JournalCode {
  code: string;
  // Topic is not shown here – it will be fetched on the chat page.
}

function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [journalCode, setJournalCode] = useState<string>("");
  const [journals, setJournals] = useState<JournalCode[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const journalsPerPage = 5;
  const totalPages = Math.ceil(journals.length / journalsPerPage);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchWithAuth("/api/user/profile");
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  // Fetch the user's journal rooms
  useEffect(() => {
    const fetchUserJournals = async () => {
      try {
        const response = await fetchWithAuth("/api/journal/user/journals", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch journals");

        const data: JournalCode[] = await response.json();
        setJournals(data);
      } catch (error) {
        console.error("Error fetching user journals:", error);
      }
    };

    fetchUserJournals();
  }, []);

  const createJournalCode = async () => {
    setError("");
    try {
      const response = await fetchWithAuth("/api/journal/create-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to create journal");

      const data: { code: string } = await response.json();
      // Navigate to the chat room page; the chat page will fetch the topic.
      router.push(`/journal/${data.code}`);
    } catch (error) {
      console.error("Error creating journal code:", error);
      setError("Failed to create journal. Please try again.");
    }
  };

  const joinJournalCode = async () => {
    setError("");

    if (journalCode.length !== 6) {
      setError("Journal code must be exactly 6 characters.");
      return;
    }

    try {
      const response = await fetchWithAuth("/api/journal/join-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: journalCode }),
      });

      if (!response.ok) throw new Error("Invalid journal code");

      //const data: { code: string } = await response.json();
      router.push(`/journal/${journalCode}`);
    } catch (error) {
      console.error("Error joining journal:", error);
      setError("Failed to join journal. Check the code and try again.");
    }
  };

  // Handle sign out
  const signOut = async () => {
    try {
      await fetchWithAuth("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      router.push("/login");
    }
  };

  // Determine which journals to display for the current page
  const indexOfLastJournal = currentPage * journalsPerPage;
  const indexOfFirstJournal = indexOfLastJournal - journalsPerPage;
  const currentJournals = journals.slice(indexOfFirstJournal, indexOfLastJournal);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-300 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center text-2xl">
            Welcome, {user.username}
          </CardTitle>
          <Button
            onClick={signOut}
            className="mt-2 bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            Sign Out
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <Button
            onClick={createJournalCode}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <PlusCircle className="mr-2" /> Add a New Cafe
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
              className="bg-green-600 hover:bg-green-700 transition-colors flex items-center"
            >
              <LogIn className="mr-2" /> Join
            </Button>
          </div>

          {journals.length > 0 && (
            <div>
              <h3 className="text-center text-lg font-semibold mt-4">
                Your Cafe Sessions
              </h3>
              <ul className="mt-2 space-y-2">
                {currentJournals.map((journal) => (
                  <li
                    key={journal.code}
                    onClick={() => router.push(`/journal/${journal.code}`)}
                    className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded text-center"
                  >
                    {journal.code}
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-500 hover:bg-gray-600"
                  >
                    Previous
                  </Button>
                  <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="bg-gray-500 hover:bg-gray-600"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
export default HomePage;