"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Settings, LogOut, Calendar } from "lucide-react"
import { useAuthStore } from "@/src/shared/store/authStore"
import { useRouter } from "next/navigation"

export default function MyPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, fetchUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 로그인 체크
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // 사용자 정보 로드
    const loadUser = async () => {
      try {
        await fetchUser()
      } catch (error) {
        console.error("Failed to load user:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [isAuthenticated, fetchUser, router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#651d2a] mx-auto" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f3f0] to-[#faf8f5] pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-[#651d2a] to-[#7a2433] text-white p-8">
              <div className="flex items-center space-x-6">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-[#8b3a47]"
                  />
                ) : (
                  <div className="w-20 h-20 bg-[#8b3a47] rounded-full flex items-center justify-center">
                    <User className="w-10 h-10" />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-[#f5f3f0] mt-1">
                    {user.provider === 'google' && '🔵 Google Account'}
                    {user.provider === 'apple' && '🍎 Apple Account'}
                    {user.provider === 'local' && 'OneDay Korea Member'}
                  </p>
                  <p className="text-[#faf8f5] text-sm mt-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member since {new Date(user.createdAt).toLocaleDateString()}
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
                        value={user.name}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={user.username}
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
                        value={user.email || 'Not provided'}
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
                        value={user.phone || 'Not provided'}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
                        readOnly
                      />
                    </div>
                  </div>

                  {user.birthDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={new Date(user.birthDate).toLocaleDateString()}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
                          readOnly
                        />
                      </div>
                    </div>
                  )}

                  {user.gender && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={user.gender}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#651d2a] text-gray-900"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Status */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Account Status</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium text-gray-900">{user.status}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Grade</p>
                      <p className="font-medium text-gray-900">{user.userGrade || 'General'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email Verified</p>
                      <p className="font-medium text-gray-900">
                        {user.emailVerified ? '✅ Verified' : '❌ Not Verified'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Account Type</p>
                      <p className="font-medium text-gray-900">
                        {user.provider === 'google' && '🔵 Google'}
                        {user.provider === 'apple' && '🍎 Apple'}
                        {user.provider === 'local' && '📧 Email'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <Button
                    className="bg-[#651d2a] hover:bg-[#4a1520] text-white"
                    onClick={() => router.push('/mypage/edit')}
                  >
                    Edit Profile
                  </Button>
                  {user.provider === 'local' && (
                    <Button
                      variant="outline"
                      className="border-[#651d2a] text-[#651d2a] hover:bg-[#f5f3f0] bg-transparent"
                      onClick={() => router.push('/mypage/change-password')}
                    >
                      Change Password
                    </Button>
                  )}
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
                    <Button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2"
                    >
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
