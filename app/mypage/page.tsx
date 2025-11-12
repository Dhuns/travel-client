"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Settings, LogOut } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white p-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#8b3a47] rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className="text-[#f5f3f0] mt-1">OneDay Korea Member</p>
                  <p className="text-[#faf8f5] text-sm mt-2">
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
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? "border-[#651d2a] text-[#651d2a]"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white">Edit Profile</Button>
                  <Button variant="outline" className="border-[#651d2a] text-[#651d2a] hover:bg-[#f5f3f0] bg-transparent">
                    Change Password
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
