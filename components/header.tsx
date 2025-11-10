"use client"

import type React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, User, Menu, X, LogIn, ShoppingCart, ChevronDown } from "lucide-react"
import { useAuthStore } from "@/src/shared/store/authStore"

/**
 * 헤더 컴포넌트 - 웹사이트의 상단 네비게이션
 *
 * 주요 기능:
 * - 반응형 네비게이션 메뉴
 * - 검색 기능
 * - 사용자 인증 상태에 따른 조건부 UI
 * - 장바구니 기능
 * - 사용자 드롭다운 메뉴
 *
 * 백엔드 연동 가이드:
 * - 검색 API: /api/search?q={query} 엔드포인트 구현 필요
 * - 사용자 인증: useAuth 훅 또는 Context로 로그인 상태 관리
 * - 장바구니 API: /api/cart 엔드포인트로 장바구니 아이템 수 조회
 * - 사용자 정보 API: /api/user/profile로 사용자 정보 조회
 */
export default function Header() {
  // 상태 관리
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false) // Tours 드롭다운 메뉴 상태 추가
  const router = useRouter()

  // Auth Store 연동
  const { isAuthenticated, user: authUser, logout: authLogout, fetchUser } = useAuthStore()
  const [cartItemCount, setCartItemCount] = useState(0) // 백엔드에서 장바구니 아이템 수 조회

  // 로그인 시 사용자 정보 가져오기
  useEffect(() => {
    if (isAuthenticated && !authUser) {
      fetchUser()
    }
  }, [isAuthenticated, authUser, fetchUser])

  const tourCategories = useMemo(
    () => [
      { href: "/tours/history", label: "History Tour", description: "Explore Korea's rich historical heritage" },
      { href: "/tours/private", label: "Private Tour", description: "Personalized tours for your group" },
      { href: "/tours/multiday", label: "Multiday Tour", description: "Extended adventures across Korea" },
      { href: "/tours/package", label: "Package Tour", description: "All-inclusive tour packages" },
    ],
    [],
  )

  // 네비게이션 메뉴 항목들
  const navigationItems = useMemo(
    () => [
      { href: "/tours", label: "Tours", hasDropdown: true }, // Tours에 드롭다운 플래그 추가
      { href: "/destinations", label: "Destinations" },
      { href: "/services", label: "Services" },
      { href: "/shop", label: "Shop" },
      { href: "/insights", label: "Travel Insights" },
    ],
    [],
  )

  // 검색 처리 함수
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        // TODO: 백엔드 연동 시 검색 API 호출
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        setSearchOpen(false)
        setSearchQuery("")
      }
    },
    [searchQuery, router],
  )

  const handleLogout = useCallback(async () => {
    try {
      await authLogout()
      setUserDropdownOpen(false)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }, [authLogout, router])

  // 모바일 메뉴 토글 함수
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  // 검색창 토글 함수
  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev)
  }, [])

  const toggleUserDropdown = useCallback(() => {
    setUserDropdownOpen((prev) => !prev)
  }, [])

  const toggleToursDropdown = useCallback(() => {
    setToursDropdownOpen((prev) => !prev)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-2">
          {/* 로고 섹션 */}
          <div className="hover:opacity-80 transition-opacity duration-300 cursor-pointer">
            <Link href="/">
              <Image
                src="/tumakr-logo.png"
                alt="Tumakr Korea History Tour"
                width={120}
                height={120}
                priority
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center space-x-8 text-sm text-gray-600">
            {navigationItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() => setToursDropdownOpen(true)}
                  onMouseLeave={() => setToursDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="hover:text-[#651d2a] transition-colors duration-300 relative flex items-center space-x-1 py-2"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 stroke-2" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#651d2a] transition-all duration-300 group-hover:w-full"></span>
                  </Link>

                  {/* Tours 드롭다운 메뉴 */}
                  {toursDropdownOpen && (
                    <div
                      className="absolute left-0 top-full pt-2 w-72 z-50"
                      onMouseEnter={() => setToursDropdownOpen(true)}
                      onMouseLeave={() => setToursDropdownOpen(false)}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                        {tourCategories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="block px-4 py-3 hover:bg-[#eda89b]/10 transition-colors duration-200"
                            onClick={() => setToursDropdownOpen(false)}
                          >
                            <div className="font-medium text-gray-900 hover:text-[#651d2a] transition-colors">
                              {category.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#651d2a] transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#651d2a] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ),
            )}
          </div>

          {/* 우측 아이콘 섹션 */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {/* 검색 아이콘 */}
            <button
              onClick={toggleSearch}
              className="hover:text-[#651d2a] transition-colors duration-300 p-2 rounded-full hover:bg-[#eda89b]/10"
              title="검색"
              aria-label="검색 열기"
            >
              <Search className="w-5 h-5 stroke-2" />
            </button>

            <Link
              href="/cart"
              className="hover:text-[#651d2a] transition-colors duration-300 p-2 rounded-full hover:bg-[#eda89b]/10 relative"
              title="장바구니"
            >
              <ShoppingCart className="w-5 h-5 stroke-2" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#651d2a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>

            {!isAuthenticated ? (
              // 로그인 전: 로그인 버튼만 표시
              <Link
                href="/login"
                className="hover:text-[#651d2a] transition-colors duration-300 p-2 flex items-center space-x-1 rounded-full hover:bg-[#eda89b]/10"
                title="로그인"
              >
                <LogIn className="w-5 h-5 stroke-2" />
                <span className="hidden md:inline text-xs">Login</span>
              </Link>
            ) : (
              // 로그인 후: 사용자 드롭다운 메뉴
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="hover:text-[#651d2a] transition-colors duration-300 p-2 flex items-center space-x-1 rounded-full hover:bg-[#eda89b]/10"
                  title="사용자 메뉴"
                >
                  <User className="w-5 h-5 stroke-2" />
                  <span className="hidden md:inline text-xs">{authUser?.name || "User"}</span>
                  <ChevronDown className="w-3 h-3 stroke-2" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{authUser?.name || "User"}</p>
                      <p className="text-xs text-gray-500">{authUser?.email || authUser?.username}</p>
                    </div>
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#eda89b]/10 hover:text-[#651d2a]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      마이페이지
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#eda89b]/10 hover:text-[#651d2a]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      주문내역
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#eda89b]/10 hover:text-[#651d2a]"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      찜한상품
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden text-gray-600 hover:text-[#651d2a] transition-colors duration-300"
              onClick={toggleMobileMenu}
              aria-label="모바일 메뉴 토글"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 검색창 */}
        {searchOpen && (
          <div className="py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tours, destinations, and products..."
                className="flex-1 px-4 py-2 border border-[#6d8675] rounded-full focus:outline-none focus:ring-2 focus:ring-[#651d2a]"
                autoFocus
              />
              <Button
                type="submit"
                className="bg-[#651d2a] hover:bg-[#4a1520] text-white px-6 py-2 rounded-full"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
            </form>
          </div>
        )}

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4 text-sm text-gray-600">
              {/* Tours 카테고리 */}
              <div className="border-b border-gray-100 pb-2">
                <Link
                  href="/tours"
                  className="hover:text-[#651d2a] transition-colors duration-300 py-2 font-medium block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tours
                </Link>
                <div className="pl-4 space-y-2 mt-2">
                  {tourCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block py-1 text-xs text-gray-500 hover:text-[#651d2a] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 나머지 메뉴 항목들 */}
              {navigationItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#651d2a] transition-colors duration-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="hover:text-[#651d2a] transition-colors duration-300 py-2 flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>장바구니</span>
                {cartItemCount > 0 && (
                  <span className="bg-[#651d2a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>
              {!isAuthenticated ? (
                <Link
                  href="/login"
                  className="hover:text-[#651d2a] transition-colors duration-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  로그인
                </Link>
              ) : (
                <>
                  <Link
                    href="/mypage"
                    className="hover:text-[#651d2a] transition-colors duration-300 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <Link
                    href="/orders"
                    className="hover:text-[#651d2a] transition-colors duration-300 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    주문내역
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="text-left hover:text-red-600 transition-colors duration-300 py-2"
                  >
                    로그아웃
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
