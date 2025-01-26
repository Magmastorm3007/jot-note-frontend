import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Lock, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Connect, Share, and <br />
            <span className="text-orange-600">Grow Together</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            JotNote is more than a journaling app. 
            Create meaningful connections, share experiences, 
            and discover yourself through collaborative journaling.
          </p>
          
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link href="/login">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 transition-colors group"
              >
                Get Started
                <ArrowRight 
                  className="ml-2 group-hover:translate-x-1 transition-transform" 
                />
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Placeholder */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="bg-yellow-500/50 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-xl">
            <div className="w-[300px] h-[400px] bg-white rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MessageCircle 
                  className="mx-auto mb-4 text-blue-600" 
                  size={64} 
                />
                <p className="text-gray-700 font-semibold">
                  Your Journey, Shared Moments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose JotNote?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <MessageCircle className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-4 text-blue-700">
                Shared Experiences
              </h3>
              <p className="text-gray-600">
                Create and join journal rooms to connect deeply.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <Sparkles className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-4 text-blue-700">
                Daily Inspiration
              </h3>
              <p className="text-gray-600">
                Thoughtful prompts to spark your creativity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <Lock className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-4 text-blue-700">
                Private & Secure
              </h3>
              <p className="text-gray-600">
                Your thoughts are protected with advanced security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 JotNote. Connecting hearts, one journal at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
