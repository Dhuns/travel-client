"use client";

import { ArrowRight, Check, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 bg-gradient-to-r from-tumakr-mustard to-tumakr-sage-green overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/hero-products.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/30">
            <Gift className="w-4 h-4" />
            <span>COMPLIMENTARY WITH EVERY TOUR</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg leading-tight">
            Memories of Korea, <span className="text-white/90">On Us</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-md leading-relaxed">
            We believe the best souvenirs are the ones that tell a story. That's why we
            gift these exclusive, high-quality mementos to every traveler who joins our
            tours.
          </p>
          <Link href="/tours">
            <Button className="bg-white text-tumakr-maroon hover:bg-white/90 px-8 py-3 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              Book a Tour & Get Your Gifts
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Gifts Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl space-y-24">
          {/* Item 1: Gift Set */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/hero-products.jpg"
                alt="Gift"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-tumakr-mustard text-white px-4 py-2 rounded-full font-bold shadow-lg">
                PREMIUM APPAREL
              </div>
            </div>
            <div className="space-y-8 lg:pl-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">Signature Hoodie</h2>
                <p className="text-xl text-tumakr-maroon font-medium">
                  Comfort meets Tradition
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Stay warm and stylish with our exclusive signature hoodie. Made from
                  high-quality, soft cotton blend, it features subtle embroidery inspired
                  by traditional Korean patterns. Perfect for your travels or as a cozy
                  reminder of your journey.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Premium Cotton Blend</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Embroidered Details</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Unisex Fit</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Durable Fabric</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2: Accessories (Reversed Layout) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 lg:pr-10 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Eco-Friendly Tote Bag
                </h2>
                <p className="text-xl text-tumakr-sage-green font-medium">
                  Sustainable Style for Every Day
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Carry your memories responsibly with our durable eco-bag. Featuring
                  unique artwork that captures the beauty of Korean landscapes, this
                  spacious tote is perfect for shopping, daily commutes, or carrying your
                  travel essentials.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-sage-green/10 rounded-full flex items-center justify-center text-tumakr-sage-green">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">100% Organic Cotton</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-sage-green/10 rounded-full flex items-center justify-center text-tumakr-sage-green">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Spacious Design</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-sage-green/10 rounded-full flex items-center justify-center text-tumakr-sage-green">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Unique Art Print</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-sage-green/10 rounded-full flex items-center justify-center text-tumakr-sage-green">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Reinforced Handles</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group order-1 lg:order-2">
              <Image
                src="/images/luxury-collection.jpg"
                alt="Eco-Friendly Tote Bag"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 right-6 bg-tumakr-sage-green text-white px-4 py-2 rounded-full font-bold shadow-lg">
                SUSTAINABLE
              </div>
            </div>
          </div>

          {/* Item 3: Guidebook */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/modern-skincare.jpg"
                alt="Premium Tumbler"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-tumakr-maroon text-white px-4 py-2 rounded-full font-bold shadow-lg">
                DAILY ESSENTIAL
              </div>
            </div>
            <div className="space-y-8 lg:pl-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">Premium Tumbler</h2>
                <p className="text-xl text-tumakr-maroon font-medium">
                  Hydration with Elegance
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Keep your beverages at the perfect temperature with our sleek,
                  double-walled tumbler. Designed for both functionality and style, it
                  features a minimalist aesthetic with the Tumakr logo, making it an ideal
                  companion for your daily adventures.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Double-Wall Insulation
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Leak-Proof Lid</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">BPA Free</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-tumakr-maroon/10 rounded-full flex items-center justify-center text-tumakr-maroon">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Sleek Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
