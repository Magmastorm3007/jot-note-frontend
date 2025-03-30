"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
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

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `token=${data.token}; path=/; secure; samesite=strict`;
        router.push('/home');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.'+err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-400">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Create Account</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <CardContent className="space-y-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full"
          />
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
            onClick={handleSignup} 
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Sign Up
          </Button>
          <div className="text-center">
            Already have an account? 
            <Link 
              href="/login" 
              className="ml-2 text-green-700 hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
