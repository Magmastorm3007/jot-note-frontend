"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        // More robust cookie setting
        document.cookie = `token=${data.token}; path=/; ${
          process.env.NODE_ENV === 'production' ? 'secure; ' : ''
        }samesite=strict; max-age=${60 * 60 * 24 * 7}`; // 7 days expiry

        // Optional: Store token in localStorage as backup
        localStorage.setItem('authToken', data.token);

        router.push('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    }
  }; 


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to CozyChat</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <CardContent className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full"
          />
          <Button 
            onClick={handleLogin} 
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Login
          </Button>
          <div className="text-center">
            Not a member? 
            <Link 
              href="/signup" 
              className="ml-2 text-blue-700 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
