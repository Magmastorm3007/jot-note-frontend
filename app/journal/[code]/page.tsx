"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { fetchWithAuth } from "@/utils/api";
import EmojiPicker from "emoji-picker-react";

type Message = {
  id: string;
  user: { _id: string; username: string } | string;
  content: string;
  date: string; // Using the 'date' field instead of 'createdAt'
};

function JournalPage() {
  const { code } = useParams() as { code: string };
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  // Fetch user profile using credentials (cookies)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetchWithAuth("/api/user/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setCurrentUserId(data.id);
        console.log("Current User ID:", data.id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  // Set up the Socket.IO connection. Disconnect and reconnect when journal code changes.
  useEffect(() => {
    if (!code) return;

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin;
    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("joinJournalRoom", code);
    });

    newSocket.on("newJournalEntry", (entry: any) => {
      console.log("New entry received:", entry);
      // Using entry.date for the timestamp
      setMessages((prev) => [
        ...prev,
        {
          id: entry.id,
          user: entry.user,
          content: entry.content,
          date: entry.date,
        },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [code]);

  // Fetch existing messages and topic from the API
  useEffect(() => {
    if (!code) return;

    const fetchMessages = async () => {
      try {
        console.log("Fetching messages for:", code);
        const res = await fetchWithAuth(`/api/journal/get-messages/${code}?page=1&limit=50`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setTopic(data.topic);
        // Assuming data.messages already contains a 'date' field for each message
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [code]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || loading) return;
    setLoading(true);

    if (socket) {
      const messageData = {
        journalCodeId: code,
        content: newMessage,
        userId: currentUserId,
      };
      socket.emit("createJournalEntry", messageData, (response: { success?: boolean; error?: string }) => {
        if (response?.error) {
          console.error("Error sending message:", response.error);
        } else {
          console.log("Message sent successfully");
        }
      });
      console.log("Message sent:", messageData);
    }

    setNewMessage("");
    setLoading(false);
  };

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sort messages by date (oldest first)
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Handle emoji click from the picker
  const onEmojiClick = (emojiData: any, event: MouseEvent) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Handle copying the invite code to clipboard
  const handleCopyInviteCode = () => {
    if (code) {
      navigator.clipboard.writeText(code)
        .then(() => {
          setInviteCopied(true);
          setTimeout(() => setInviteCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy invite code:", error);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-300 text-gray-900 p-4 flex flex-col">
      <Card className="mb-4 bg-yellow-100 shadow-2xl">
        <CardHeader>
          <CardTitle className="mt-2 text-lg text-gray-700">
            Enjoy a Good Conversation! Have a Coffee ☕ !
          </CardTitle>
          {topic && <p className="mt-2 text-lg italic text-gray-700">Today's Topic: {topic}</p>}
          {code && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-md text-orange-700">Add a friend</span>
              <Button
                onClick={handleCopyInviteCode}
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
              >
                {inviteCopied ? "Copied!" : "Copy Invite Code"}
              </Button>
            </div>
          )}
        </CardHeader>
      </Card>
      <div className="flex-1 overflow-y-auto p-4 bg-yellow-50 rounded-lg shadow-inner">
        {sortedMessages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet.</div>
        ) : (
          sortedMessages.map((msg) => {
            const isCurrentUser = typeof msg.user === "object" && msg.user._id === currentUserId;
            return (
              <div
                key={msg.id}
                className={`mb-4 p-3 rounded-lg max-w-md ${
                  isCurrentUser
                    ? "bg-orange-500 text-white self-end"
                    : "bg-yellow-400 text-gray-900 self-start"
                }`}
              >
                <p className="font-semibold">
                  {typeof msg.user === "object" ? msg.user.username : msg.user}
                </p>
                <p>{msg.content}</p>
                <p className="text-xs text-gray-700">
                  {msg.date
                    ? new Date(msg.date).toLocaleDateString([], {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : new Date().toLocaleDateString([], {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </p>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef}></div>
      </div>
      {/* Message Input Section */}
      <div className="mt-4 relative w-full max-w-lg mx-auto">
        {showEmojiPicker && (
          <div className="absolute bottom-full left-0 mb-2 z-10 w-full max-w-lg">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <div className="flex w-full gap-2">
          <Button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg"
          >
            😊
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow p-3 rounded-lg bg-yellow-100 text-gray-900 border border-yellow-300"
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 px-4 py-3 text-white rounded-lg"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JournalPage;
