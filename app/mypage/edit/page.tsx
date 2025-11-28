"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useAuthStore } from "@/src/shared/store/authStore"
import { updateProfile } from "@/src/shared/apis/user"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function EditProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, accessToken, fetchUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

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

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.name.trim()) {
      setError("Name is required")
      return
    }

    if (!user || !accessToken) return

    setIsSaving(true)
    try {
      await updateProfile(accessToken, {
        id: user.id,
        name: formData.name.trim(),
        phone: formData.phone.trim() || undefined,
      })
      await fetchUser()
      setSuccess(true)
      setTimeout(() => {
        router.push("/mypage")
      }, 1000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600 mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16">
      <div className="max-w-lg mx-auto px-5">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/mypage"
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Edit Profile</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-5 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">Profile updated successfully</p>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <Link
              href="/mypage"
              className="flex-1 py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 px-4 bg-gray-900 rounded-lg text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
