import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TourGrid } from "@/components/tours/tour-grid";

export const revalidate = 3600; // 1시간마다 재생성

export default async function ToursPage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 bg-gradient-to-r from-[#651d2a] to-[#c4982a] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('/beautiful-korean-traditional-palace-with-tourists-.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg pt-5">
            Korea Tours & Experiences
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-6 drop-shadow-md">
            Discover authentic Korean culture with our expert local guides
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">6+</div>
              <div className="text-gray-600 text-sm">Tours Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">10K+</div>
              <div className="text-gray-600 text-sm">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">4.9</div>
              <div className="text-gray-600 text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#651d2a] mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* All Tours Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            All Tours & Experiences
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of Korean tours and experiences
          </p>
          <div className="w-16 h-1 bg-[#651d2a] mx-auto mt-4 rounded-full"></div>
        </div>

        <TourGrid />
      </div>

      {/* CTA Section */}
      <div className="bg-[#651d2a] py-8">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Let us create a custom tour just for you. Our local experts will
            design the perfect Korean experience.
          </p>
          <Link href="/chat">
            <Button
              size="lg"
              className="bg-white text-[#651d2a] hover:bg-gray-100 font-semibold px-6"
            >
              Create Custom Tour
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
