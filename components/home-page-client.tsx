"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  ExternalLink,
  Gift,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface HomePageClientProps {
  children?: React.ReactNode;
}

export default function HomePageClient({ children }: HomePageClientProps) {
  const tourCategories = [
    {
      title: "History Tours",
      description: "Deep dive into Korea's rich heritage",
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      link: "/tours/history",
      icon: MapPin,
      color: "#651d2a", // tumakr-maroon
    },
    {
      title: "Multiday Tours",
      description: "Immersive journeys across Korea",
      image: "/beautiful-jeju-island-hallasan-mountain-and-nature.jpg",
      link: "/tours/multiday",
      icon: Calendar,
      color: "#c4982a", // tumakr-mustard
    },
    {
      title: "Private Tours",
      description: "Exclusive experiences tailored just for you",
      image: "/korean-dmz-border-historical-site-and-observation-.jpg",
      link: "/tours/private",
      icon: Users,
      color: "#6d8675", // tumakr-sage-green
    },
  ];

  const goods = [
    {
      name: "Signature Hoodie",
      image: "/images/design-mode/gift-1.png",
      link: "/souvenir",
    },
    {
      name: "Eco-Friendly Tote Bag",
      image: "/images/design-mode/gift-2.png",
      link: "/souvenir",
    },
    {
      name: "Premium Tumbler",
      image: "/images/design-mode/gift-3.png",
      link: "/souvenir",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between Oneday Tours and other tours?",
      answer:
        "Oneday Tours focus on classic day trips to popular spots. Our Private, Multiday, and History tours offer deeper, more specialized experiences with custom itineraries.",
    },
    {
      question: "How does the AI Chatbot work?",
      answer:
        "Our AI Chatbot helps you customize your itinerary, answer questions about Korea, and even guide you to our legacy Oneday Tour options.",
    },
    {
      question: "Are the souvenirs really free?",
      answer:
        "Yes! We offer exclusive complimentary gifts like hoodies, tote bags, and tumblers with specific tour bookings as a thank you for choosing us.",
    },
  ];

  const scrollToTours = useCallback(() => {
    const section = document.getElementById("tours");
    section?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 4.7초 후 자동 스크롤 (스크롤 위치가 맨 위일 때만)
  useEffect(() => {
    const timer = setTimeout(() => {
      // 스크롤이 맨 위에 있을 때만 자동 스크롤 실행
      if (window.scrollY < 100) {
        const section = document.getElementById("main-services");
        section?.scrollIntoView({ behavior: "smooth" });
      }
    }, 4700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* 1. Split Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/design-mode/castle4.png"
            alt="Tumakr Korea History Tour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#651d2a]/70 via-[#651d2a]/60 to-[#651d2a]/90" />
        </div>

        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#c4982a]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#6d8675]/20 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Main Content */}
          <div className="text-white">
            <div className="mb-8 opacity-0 animate-[fadeIn_1s_ease-in_0.5s_forwards]">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <Star className="w-5 h-5 fill-white" />
                <span className="font-bold tracking-wide">
                  Premium Korea Travel Experience
                </span>
              </div>
            </div>

            <h1 className="text-2xl lg:text-6xl font-bold mb-6 leading-tight opacity-0 animate-[fadeIn_1s_ease-in_1s_forwards]">
              tumakr
              <br />
              Korea History Tour
              <br />
              <span className="text-[#c4982a] text-2xl">
                Curated by AI, Guided by Experts.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed opacity-0 animate-[fadeIn_1s_ease-in_1.5s_forwards]">
              Design your perfect trip with our intelligent assistant or explore
              our premium tour collections.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-[fadeIn_1s_ease-in_2s_forwards]">
              <Button
                size="lg"
                className="bg-[#651d2a] text-white hover:bg-[#651d2a]/90 px-8 py-6 text-lg rounded-full shadow-2xl group"
                onClick={() =>
                  document
                    .getElementById("main-services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat with AI Planner
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 px-8 py-6 text-lg rounded-full"
                onClick={() =>
                  document
                    .getElementById("tours")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Tours
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right: Chat Bubbles */}
          <div className="hidden lg:flex flex-col gap-4 opacity-0 animate-[fadeIn_1s_ease-in_2.5s_forwards]">
            {/* AI Bot Message */}
            <div className="flex items-start gap-3 mr-auto max-w-md">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c4982a] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl rounded-tl-none px-6 py-4 shadow-lg">
                <p className="text-gray-800 text-sm leading-relaxed">
                  Hello! I can help you plan your Korea trip.
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  Looking for a private family tour or a historical adventure?
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start gap-3 ml-auto max-w-md">
              <div className="bg-[#c4982a] text-white rounded-2xl rounded-tr-none px-6 py-4 shadow-lg">
                <p className="text-sm leading-relaxed">
                  I want to visit Gyeongbokgung and have a Hanbok experience!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
          <span className="text-sm font-semibold tracking-wider uppercase">
            Scroll Down
          </span>
          <button onClick={scrollToTours} className="focus:outline-none">
            <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" />
          </button>
        </div>
      </section>

      {/* 2. Main Services Split Section */}
      <section
        id="main-services"
        className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row"
      >
        {/* Left: AI Chatbot */}
        <div className="relative w-full lg:w-1/2 bg-[#c4982a] flex items-center justify-center py-16 px-6 md:py-20 md:px-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse hidden lg:block" />

          <div className="relative z-10 max-w-xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 lg:mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">AI-Powered Planning</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              Plan Your
              <br />
              Perfect Trip
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 leading-relaxed">
              Get instant itinerary suggestions, real-time advice, and seamless
              booking with our intelligent travel assistant.
            </p>

            <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-10">
              {[
                "24/7 Smart Planning",
                "Custom Itineraries",
                "Instant Recommendations",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-base lg:text-lg">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="bg-white text-[#c4982a] hover:bg-white/90 px-6 py-5 md:px-8 md:py-6 lg:px-10 lg:py-7 text-base lg:text-lg rounded-full shadow-2xl group/btn"
            >
              <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              Start Chat Now
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Right: Oneday Legacy */}
        <div className="relative w-full lg:w-1/2 bg-[#651d2a] flex items-center justify-center py-16 px-6 md:py-20 md:px-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent)]" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse hidden lg:block" />

          <div className="relative z-10 max-w-xl text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 lg:mb-6">
              <Star className="w-4 h-4 fill-white" />
              <span className="text-sm font-bold">Most Popular</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
              Classic
              <br />
              Oneday Tours
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 leading-relaxed">
              Join thousands of travelers on our beloved daily group tours to
              Nami Island, DMZ, and iconic Korean destinations.
            </p>

            <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-10">
              {["Daily Departures", "Small Groups", "Expert Guides"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="flex items-center text-base lg:text-lg"
                  >
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                    </div>
                    {item}
                  </li>
                )
              )}
            </ul>

            <Link href="https://www.onedaykorea.com" target="_blank">
              <Button
                size="lg"
                className="bg-white text-[#651d2a] hover:bg-white/90 px-6 py-5 md:px-8 md:py-6 lg:px-10 lg:py-7 text-base lg:text-lg rounded-full shadow-2xl group/btn"
              >
                <Calendar className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Explore Tours
                <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 z-20">
          <span className="text-xs lg:text-sm font-semibold tracking-wider uppercase">
            Scroll Down
          </span>
          <button onClick={scrollToTours} className="focus:outline-none">
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 rotate-90 animate-bounce" />
          </button>
        </div>
      </section>

      {/* 3. Core Tour Categories - Asymmetric Layout */}
      <section id="tours" className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block text-[#c4982a] font-bold text-sm tracking-wider uppercase mb-4 bg-[#c4982a]/10 px-4 py-2 rounded-full">
              Curated Experiences
            </span>
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-6">
              tumakr Exclusives
            </h2>
            <p className="text-xl text-gray-900 max-w-2xl mx-auto">
              Choose your adventure from our premium collection
            </p>
          </div>

          {/* Asymmetric Flex Layout */}
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* First Tour - Large */}
            <Link href={tourCategories[0].link} className="lg:w-1/2 group">
              <div className="relative h-full min-h-[500px] lg:min-h-[712px] rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:rotate-1">
                <Image
                  src={tourCategories[0].image || "/placeholder.svg"}
                  alt={tourCategories[0].title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#651d2a] via-[#651d2a]/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-[#651d2a]" />
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    {tourCategories[0].title}
                  </h3>
                  <p className="text-xl text-white/90 mb-6">
                    {tourCategories[0].description}
                  </p>
                  <span className="inline-flex items-center text-white font-bold text-lg transition-colors">
                    Explore Now{" "}
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Second & Third Tours - Stacked */}
            <div className="flex flex-col lg:w-1/2 gap-8">
              {tourCategories.slice(1).map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    href={category.link}
                    key={index + 1}
                    className="block group flex-1"
                  >
                    <div className="relative h-full min-h-[300px] rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:-rotate-1">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          index === 0
                            ? "from-[#c4982a]/80 to-[#c4982a]"
                            : "from-[#6d8675]/80 to-[#6d8675]"
                        } opacity-85 group-hover:opacity-90 transition-opacity`}
                      />

                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center self-start">
                          <IconComponent
                            className="w-6 h-6"
                            style={{ color: category.color }}
                          />
                        </div>

                        <div>
                          <h3
                            className={`${
                              index === 1 ? "text-3xl lg:text-4xl" : "text-3xl"
                            } font-bold text-white mb-3`}
                          >
                            {category.title}
                          </h3>
                          <p className="text-white/90 mb-4">
                            {category.description}
                          </p>
                          <span className="inline-flex items-center text-white font-semibold group-hover:text-white/80 transition-colors">
                            Learn More{" "}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Popular Destinations (children) */}
      {children}

      {/* 5. AI Chatbot Promotion - Diagonal Layout */}
      <section className="relative py-32 overflow-hidden bg-white">
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#651d2a] via-[#651d2a] to-[#651d2a]/90 transform -skew-y-3 origin-top-left" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#c4982a] rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#6d8675] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left: Content */}
            <div className="text-white space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full">
                <Sparkles className="w-5 h-5 text-[#c4982a]" />
                <span className="font-bold">Powered by AI</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Not Sure Where
                <br />
                to Start?
              </h2>

              <p className="text-2xl text-white/90 leading-relaxed">
                Our AI assistant connects you to everything: from classic Oneday
                tours to custom private adventures.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Calendar, text: "Find Legacy Tours" },
                  { icon: Sparkles, text: "Custom Itineraries" },
                  { icon: MessageCircle, text: "Instant Answers" },
                  { icon: MapPin, text: "Local Insights" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 hover:bg-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#c4982a] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold text-lg">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-[#c4982a] text-white hover:bg-[#c4982a]/90 px-12 py-8 text-xl rounded-full shadow-2xl mt-8 group"
                >
                  Launch AI Chat
                  <MessageCircle className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Right: Chat Preview */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border border-white/20">
                <div className="flex items-center gap-4 border-b border-black pb-6 mb-6">
                  <div className="w-14 h-14 bg-[#c4982a] rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-black">
                      AI Travel Assistant
                    </h3>
                    <p className="text-sm text-gray-900 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Online now
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-white rounded-2xl rounded-tl-sm p-5 max-w-[85%] shadow-sm">
                    <p className="text-black leading-relaxed">
                      I want to visit Nami Island tomorrow. Any tours available?
                    </p>
                  </div>
                  <div className="bg-[#c4982a]/15 rounded-2xl rounded-tr-sm p-5 max-w-[90%] ml-auto shadow-sm border border-[#c4982a]/20">
                    <p className="text-[#651d2a] leading-relaxed">
                      Perfect! That's one of our popular Oneday Legacy tours. I
                      can show you availability or suggest a private custom
                      tour. Which interests you?
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-900 pl-2">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-[#c4982a]/50 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-[#c4982a]/50 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-[#c4982a]/50 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <span>AI is typing...</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-[#6d8675] text-white px-6 py-3 rounded-full shadow-xl transform rotate-12 font-bold">
                Free to Use! ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Goods Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#6d8675]/10 text-[#6d8675] px-5 py-2 rounded-full mb-4">
              <Gift className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide">
                Exclusive Benefits
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Memories to Take Home
            </h2>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">
              Receive premium Korean souvenirs with select tour bookings
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {goods.map((item, index) => (
                <Link href={item.link} key={index} className="group">
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#6d8675] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          FREE
                        </span>
                      </div>
                    </div>
                    <div className="p-6 text-center flex-1 flex flex-col justify-center">
                      <h3 className="font-bold text-xl text-black mb-2 group-hover:text-[#6d8675] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-900 mb-4">
                        Complimentary with tour
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-900">
              Everything you need to know about planning your trip
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-0 rounded-2xl px-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-black hover:text-[#651d2a] transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-900 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
