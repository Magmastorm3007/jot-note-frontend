import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 flex flex-col">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Snuggle Up and <br />
            <span className="text-rose-600">Chat About Anything</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            CozyChat is your digital fireplace, perfect for sharing thoughts and
            stories on any topic under the sun. Connect with others, spark
            joyful conversations, and enjoy the warmth of community.
          </p>

          <div className="flex justify-center lg:justify-start space-x-4">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-rose-600 hover:bg-rose-700 transition-colors group"
              >
                Join the Cozy Chat
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l3.152-2.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Placeholder */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="bg-amber-500/50 backdrop-blur-md border border-pink-100 rounded-2xl p-6 shadow-xl">
            <div className="w-[300px] h-[400px] bg-white rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Heart className="mx-auto mb-4 text-rose-600" size={64} />
                <p className="text-gray-700 font-semibold">
                  Warm Conversations, Shared Comfort
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
            Why CozyChat?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <Users className="mx-auto mb-4 text-rose-600" size={48} />
              <h3 className="text-xl font-semibold mb-4 text-rose-700">
                Connect Over Coffee
              </h3>
              <p className="text-gray-600">
                Find friends and kindred spirits in cozy chat rooms.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <BookOpen className="mx-auto mb-4 text-rose-600" size={48} />
              <h3 className="text-xl font-semibold mb-4 text-rose-700">
                Endless Topics
              </h3>
              <p className="text-gray-600">
                From books to baking, chat about anything that sparks joy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <Heart className="mx-auto mb-4 text-rose-600" size={48} />
              <h3 className="text-xl font-semibold mb-4 text-rose-700">
                Warm & Welcoming
              </h3>
              <p className="text-gray-600">
                A friendly space to unwind and share your thoughts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 CozyChat. Bringing people together, one cozy chat at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
