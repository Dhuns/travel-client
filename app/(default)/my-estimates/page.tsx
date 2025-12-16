"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import QuotationModal from "@/src/components/Chat/QuotationModal";
import { getAllChatSessions } from "@/src/shared/apis/chat";
import { useAuthStore } from "@/src/shared/store/authStore";
import dayjs from "dayjs";
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * My Estimates Page
 *
 * Display list of user's requested estimates
 * - Filter by estimate status
 * - View estimate details
 */

interface Estimate {
  id: string;
  batchId: number;
  title: string;
  destination: string;
  image: string;
  status: "quote-pending" | "quote-received" | "quote-approved" | "cancelled";
  requestDate: string;
  details: {
    startDate?: string;
    endDate?: string;
    duration?: string;
    travelers?: number;
    budget?: number;
  };
}

export default function MyEstimatesPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [filter, setFilter] = useState<
    "all" | "quote-pending" | "quote-received" | "quote-approved"
  >("all");
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBatchId, setSelectedBatchId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch estimates data from backend
  useEffect(() => {
    const fetchEstimates = async () => {
      if (!isAuthenticated || !user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const { sessions } = await getAllChatSessions({
          userId: user.id,
          status: "all",
        });

        // Filter sessions with batchId and convert to estimates
        const estimatesData: Estimate[] = sessions
          .filter((session) => session.batchId)
          .map((session) => {
            const totalTravelers =
              (session.context.adults || 0) +
              (session.context.children || 0) +
              (session.context.infants || 0);

            // Calculate date difference
            const days =
              session.context.startDate && session.context.endDate
                ? dayjs(session.context.endDate).diff(
                    dayjs(session.context.startDate),
                    "day"
                  ) + 1
                : null;

            return {
              id: session.sessionId,
              batchId: session.batchId!,
              title: session.title || session.context.destination || "Travel Estimate",
              destination: session.context.destination || "TBD",
              image: "/beautiful-korean-traditional-palace-with-tourists.jpg", // Default image
              status: "quote-pending", // Default status
              requestDate: dayjs(session.createdAt).format("YYYY-MM-DD"),
              details: {
                startDate: session.context.startDate
                  ? dayjs(session.context.startDate).format("YYYY-MM-DD")
                  : undefined,
                endDate: session.context.endDate
                  ? dayjs(session.context.endDate).format("YYYY-MM-DD")
                  : undefined,
                duration: days ? `${days - 1}N ${days}D` : undefined,
                travelers: totalTravelers > 0 ? totalTravelers : undefined,
                budget: session.context.budget,
              },
            };
          });

        setEstimates(estimatesData);
      } catch (error) {
        console.error("Failed to fetch estimates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimates();
  }, [isAuthenticated, user]);

  const getStatusBadge = (status: Estimate["status"]) => {
    const statusConfig = {
      "quote-pending": {
        label: "Under Review",
        color: "bg-tumakr-sage-green text-white animate-pulse",
      },
      "quote-received": {
        label: "Quote Received",
        color: "bg-tumakr-mustard text-white",
      },
      "quote-approved": {
        label: "Approved",
        color: "bg-[#5a7263] text-white",
      },
      cancelled: {
        label: "Cancelled",
        color: "bg-[#8b4a52] text-white",
      },
    };
    const config = statusConfig[status];
    return <Badge className={`${config.color} px-3 py-1`}>{config.label}</Badge>;
  };

  const filteredEstimates =
    filter === "all"
      ? estimates
      : estimates.filter((estimate) => estimate.status === filter);

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`;
  };

  const handleViewQuotation = (batchId: number) => {
    setSelectedBatchId(batchId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBatchId(null);
  };

  // Not authenticated case
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign In Required</h3>
            <p className="text-gray-600 mb-6">Please sign in to view your estimates</p>
            <Link href="/login">
              <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                Sign In
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-[#faf9f7] to-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Estimates</h1>
          <p className="text-gray-600">
            View and manage your travel estimates requested through AI chatbot
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white transition-all shadow-sm"
                : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon hover:text-white transition-all shadow-sm cursor-pointer"
            }
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("quote-pending")}
            className={
              filter === "quote-pending"
                ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white transition-all shadow-sm"
                : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon hover:text-white transition-all shadow-sm cursor-pointer"
            }
          >
            Under Review
          </Button>
          <Button
            onClick={() => setFilter("quote-received")}
            className={
              filter === "quote-received"
                ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white transition-all shadow-sm"
                : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon hover:text-white transition-all shadow-sm cursor-pointer"
            }
          >
            Received
          </Button>
          <Button
            onClick={() => setFilter("quote-approved")}
            className={
              filter === "quote-approved"
                ? "border border-tumakr-maroon bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white transition-all shadow-sm"
                : "border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon hover:text-white transition-all shadow-sm cursor-pointer"
            }
          >
            Approved
          </Button>
        </div>

        {/* Estimate List */}
        <div className="space-y-8">
          {isLoading ? (
            <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
              <div className="text-6xl mb-4">⏳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Loading estimates...
              </h3>
            </Card>
          ) : filteredEstimates.length === 0 ? (
            <Card className="p-12 text-center shadow-lg border border-gray-200 bg-white rounded-xl">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Estimates Found
              </h3>
              <p className="text-gray-600 mb-6">
                Chat with our AI to get your personalized travel estimate
              </p>
              <Link href="/chat">
                <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                  Request Estimate via Chat
                </Button>
              </Link>
            </Card>
          ) : (
            filteredEstimates.map((estimate) => (
              <Card
                key={estimate.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white rounded-xl p-0"
              >
                <div className="flex flex-col md:flex-row md:h-80">
                  {/* Image */}
                  <div className="relative w-full md:w-96 h-64 md:h-full shrink-0">
                    <Image
                      src={estimate.image}
                      alt={estimate.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(estimate.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {estimate.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Requested: {estimate.requestDate}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {estimate.details.startDate && estimate.details.endDate && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5 text-tumakr-maroon" />
                          <div>
                            <p className="text-xs text-gray-500">Travel Period</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {estimate.details.startDate} ~ {estimate.details.endDate}
                              {estimate.details.duration && (
                                <span className="text-gray-600 ml-1">
                                  ({estimate.details.duration})
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-tumakr-maroon" />
                        <div>
                          <p className="text-xs text-gray-500">Destination</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {estimate.destination}
                          </p>
                        </div>
                      </div>

                      {estimate.details.travelers && (
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-tumakr-maroon" />
                          <div>
                            <p className="text-xs text-gray-500">Travelers</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {estimate.details.travelers} pax
                            </p>
                          </div>
                        </div>
                      )}

                      {estimate.details.budget && (
                        <div className="flex items-center space-x-3">
                          <span className="text-tumakr-maroon text-xl">💰</span>
                          <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatPrice(estimate.details.budget)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto flex justify-end space-x-3">
                      <Button
                        onClick={() => handleViewQuotation(estimate.batchId)}
                        className="border border-tumakr-maroon text-tumakr-maroon bg-white hover:bg-tumakr-maroon hover:text-white transition-all shadow-sm cursor-pointer"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Help Section */}
        {filteredEstimates.length > 0 && (
          <Card className="mt-12 bg-linear-to-r from-tumakr-maroon/5 to-tumakr-sage-green/5 border border-gray-200 shadow-lg rounded-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Have Questions About Your Estimate?
              </h3>
              <p className="text-gray-600 mb-4">
                Chat with our AI assistant anytime for assistance
              </p>
              <Link href="/chat">
                <Button className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white">
                  Chat with AI
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Quotation Modal */}
        {selectedBatchId && (
          <QuotationModal
            batchId={selectedBatchId}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
