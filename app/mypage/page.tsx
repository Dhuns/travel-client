"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Heart, ShoppingBag, Settings, LogOut } from "lucide-react"

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // 임시 사용자 데이터
  const userData = {
    name: "김한국",
    email: "korea@example.com",
    phone: "+82 10-1234-5678",
    address: "Seoul, South Korea",
    joinDate: "2024-01-15",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-sky-600 text-white p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className="text-sky-100 mt-1">OneDay Korea Member</p>
                  <p className="text-sky-200 text-sm mt-2">
                    Member since {new Date(userData.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {[
                  { id: "profile", label: "Profile", icon: User },
                  { id: "bookings", label: "My Bookings", icon: Calendar },
                  { id: "favorites", label: "Favorites", icon: Heart },
                  { id: "orders", label: "Orders", icon: ShoppingBag },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? "border-sky-500 text-sky-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={userData.name}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={userData.email}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={userData.phone}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={userData.address}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">Edit Profile</Button>
                  <Button variant="outline" className="border-sky-600 text-sky-600 hover:bg-sky-50 bg-transparent">
                    Change Password
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bookings yet</p>
                  <p className="text-sm text-gray-400 mt-2">Start exploring our amazing tours!</p>
                  <Button className="mt-4 bg-sky-600 hover:bg-sky-700 text-white">
                    <a href="/tours">Browse Tours</a>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Tours</h2>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No favorites yet</p>
                  <p className="text-sm text-gray-400 mt-2">Save tours you love for later!</p>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                  <p className="text-sm text-gray-400 mt-2">Check out our Korean goods!</p>
                  <Button className="mt-4 bg-sky-600 hover:bg-sky-700 text-white">
                    <a href="/shop">Visit Shop</a>
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive updates about your bookings</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Get special offers and promotions</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
