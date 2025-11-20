"use client";

import { ArrowRight, Check, Gift } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 bg-gradient-to-r from-[#c4982a] to-[#6d8675] overflow-hidden">
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
            We believe the best souvenirs are the ones that tell a story. That's
            why we gift these exclusive, high-quality mementos to every traveler
            who joins our tours.
          </p>
          <Link href="/tours">
            <Button className="bg-white text-[#651d2a] hover:bg-white/90 px-8 py-3 text-lg rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
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
                alt="Historical Journey Gift Set"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[#c4982a] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                PREMIUM SET
              </div>
            </div>
            <div className="space-y-8 lg:pl-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Historical Journey Gift Set
                </h2>
                <p className="text-xl text-[#651d2a] font-medium">
                  A curated collection of Korea's heritage
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This premium gift set is designed to capture the essence of
                  your journey. It includes traditional crafts, a replica of a
                  Silla Dynasty artifact, and premium Korean tea. Each item is
                  carefully selected to represent a different era of Korean
                  history.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Traditional Crafts
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Premium Tea</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Historical Replica
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Gift Box Packaging
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2: Accessories (Reversed Layout) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 lg:pr-10 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Traditional Accessories Collection
                </h2>
                <p className="text-xl text-[#6d8675] font-medium">
                  Wearable history inspired by the Joseon Dynasty
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Beautiful handcrafted accessories that blend traditional
                  Korean aesthetics with modern usability. The collection
                  features a Norigae (traditional ornament) key ring and a silk
                  pouch, perfect for adding a touch of Korean elegance to your
                  daily life.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#6d8675]/10 rounded-full flex items-center justify-center text-[#6d8675]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">Handcrafted</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#6d8675]/10 rounded-full flex items-center justify-center text-[#6d8675]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Silk Materials
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#6d8675]/10 rounded-full flex items-center justify-center text-[#6d8675]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Norigae Keyring
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#6d8675]/10 rounded-full flex items-center justify-center text-[#6d8675]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Authentic Design
                  </span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group order-1 lg:order-2">
              <Image
                src="/images/luxury-collection.jpg"
                alt="Traditional Accessories Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 right-6 bg-[#6d8675] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                HANDCRAFTED
              </div>
            </div>
          </div>

          {/* Item 3: Guidebook */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/modern-skincare.jpg"
                alt="Illustrated History Journal"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[#651d2a] text-white px-4 py-2 rounded-full font-bold shadow-lg">
                EXCLUSIVE EDITION
              </div>
            </div>
            <div className="space-y-8 lg:pl-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Illustrated History Journal
                </h2>
                <p className="text-xl text-[#651d2a] font-medium">
                  Your personal chronicle of the journey
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  More than just a notebook, this beautifully illustrated
                  journal contains historical insights, maps, and space for your
                  own reflections. It serves as a permanent record of the
                  knowledge and memories you've gathered during your time in
                  Korea.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Custom Illustrations
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Historical Maps
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    High Quality Paper
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-[#651d2a]/10 rounded-full flex items-center justify-center text-[#651d2a]">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Hardcover Binding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
