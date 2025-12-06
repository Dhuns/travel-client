"use client";

import { ChevronDown, LogIn, Menu, Search, User, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/src/shared/store/authStore";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

// Header UI 상태 타입
interface HeaderState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  searchQuery: string;
  userDropdownOpen: boolean;
  toursDropdownOpen: boolean;
  contactDropdownOpen: boolean;
}

// Action 타입
type HeaderAction =
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "TOGGLE_SEARCH" }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "TOGGLE_USER_DROPDOWN" }
  | { type: "CLOSE_USER_DROPDOWN" }
  | { type: "SET_TOURS_DROPDOWN"; payload: boolean }
  | { type: "SET_CONTACT_DROPDOWN"; payload: boolean }
  | { type: "CLOSE_SEARCH" }
  | { type: "CLOSE_MOBILE_MENU" };

const initialState: HeaderState = {
  mobileMenuOpen: false,
  searchOpen: false,
  searchQuery: "",
  userDropdownOpen: false,
  toursDropdownOpen: false,
  contactDropdownOpen: false,
};

function headerReducer(state: HeaderState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case "TOGGLE_MOBILE_MENU":
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case "TOGGLE_SEARCH":
      return { ...state, searchOpen: !state.searchOpen };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "TOGGLE_USER_DROPDOWN":
      return { ...state, userDropdownOpen: !state.userDropdownOpen };
    case "CLOSE_USER_DROPDOWN":
      return { ...state, userDropdownOpen: false };
    case "SET_TOURS_DROPDOWN":
      return { ...state, toursDropdownOpen: action.payload };
    case "SET_CONTACT_DROPDOWN":
      return { ...state, contactDropdownOpen: action.payload };
    case "CLOSE_SEARCH":
      return { ...state, searchOpen: false, searchQuery: "" };
    case "CLOSE_MOBILE_MENU":
      return { ...state, mobileMenuOpen: false };
    default:
      return state;
  }
}

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
  const pathname = usePathname();

  // Hide header on quotation pages
  if (pathname?.startsWith("/quotation")) {
    return null;
  }

  // useReducer로 상태 관리
  const [state, dispatch] = useReducer(headerReducer, initialState);
  const {
    mobileMenuOpen,
    searchOpen,
    searchQuery,
    userDropdownOpen,
    toursDropdownOpen,
    contactDropdownOpen,
  } = state;
  const router = useRouter();

  // 사용자 드롭다운 ref
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Auth Store 연동
  const {
    isAuthenticated,
    user: authUser,
    logout: authLogout,
    fetchUser,
  } = useAuthStore();

  // 로그인 시 사용자 정보 가져오기
  useEffect(() => {
    if (isAuthenticated && !authUser) {
      fetchUser();
    }
  }, [isAuthenticated, authUser, fetchUser]);

  // 사용자 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "CLOSE_USER_DROPDOWN" });
      }
    };

    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  const tourCategories = useMemo(
    () => [
      {
        href: "/tours/history",
        label: "History Tour",
        description: "Explore Korea's rich historical heritage",
      },
      {
        href: "/tours/private",
        label: "Private Tour",
        description: "Personalized tours for your group",
      },
      {
        href: "/tours/multiday",
        label: "Multiday Tour",
        description: "Extended adventures across Korea",
      },
    ],
    []
  );

  // 네비게이션 메뉴 항목들
  const navigationItems = useMemo(
    () => [
      { href: "/", label: "Home" },
      // { href: "/souvenir", label: "Souvenir" }, 개발 후 추가
      { href: "/tours", label: "Tours", hasDropdown: true },
      { href: "/contact", label: "Contact", isContact: true }, // 개발 후 hasDropdown: true로 변경
    ],
    []
  );

  // 검색 처리 함수
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        dispatch({ type: "CLOSE_SEARCH" });
      }
    },
    [searchQuery, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await authLogout();
      dispatch({ type: "CLOSE_USER_DROPDOWN" });
      router.push("/");
    } catch (error) {
      // 로그아웃 실패 시 에러 처리
    }
  }, [authLogout, router]);

  // 모바일 메뉴 토글 함수
  const toggleMobileMenu = useCallback(() => {
    dispatch({ type: "TOGGLE_MOBILE_MENU" });
  }, []);

  // 검색창 토글 함수
  const toggleSearch = useCallback(() => {
    dispatch({ type: "TOGGLE_SEARCH" });
  }, []);

  const toggleUserDropdown = useCallback(() => {
    dispatch({ type: "TOGGLE_USER_DROPDOWN" });
  }, []);

  const setToursDropdown = useCallback((open: boolean) => {
    dispatch({ type: "SET_TOURS_DROPDOWN", payload: open });
  }, []);

  const setContactDropdown = useCallback((open: boolean) => {
    dispatch({ type: "SET_CONTACT_DROPDOWN", payload: open });
  }, []);

  const closeMobileMenu = useCallback(() => {
    dispatch({ type: "CLOSE_MOBILE_MENU" });
  }, []);

  return (
    <nav className="fixed top-0 w-full h-20 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-6 h-full max-w-7xl">
        <div className="flex items-center justify-between h-full">
          {/* 로고 섹션 */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity duration-300 cursor-pointer flex items-center gap-3"
          >
            <Image
              src="/tumakr-logo(no-text).png"
              alt="Tumakr Korea History Tour"
              width={120}
              height={120}
              priority
              className="h-12 w-auto"
            />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-gray-900">tumakr</span>
              <span className="text-xs text-gray-400">Tumakr by OnedayKorea</span>
            </div>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center space-x-8 text-sm text-gray-600">
            {navigationItems.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative group"
                  onMouseEnter={() =>
                    item.isContact ? setContactDropdown(true) : setToursDropdown(true)
                  }
                  onMouseLeave={() =>
                    item.isContact ? setContactDropdown(false) : setToursDropdown(false)
                  }
                >
                  <Link
                    href={item.href}
                    className="hover:text-tumakr-maroon transition-colors duration-300 relative flex items-center space-x-1 py-2"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 stroke-2" />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tumakr-maroon transition-all duration-300 group-hover:w-full"></span>
                  </Link>

                  {/* Tours 드롭다운 메뉴 */}
                  {!item.isContact && toursDropdownOpen && (
                    <div
                      className="absolute left-0 top-full pt-2 w-72 z-50"
                      onMouseEnter={() => setToursDropdown(true)}
                      onMouseLeave={() => setToursDropdown(false)}
                    >
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                        {tourCategories.map((category) => (
                          <Link
                            key={category.href}
                            href={category.href}
                            className="block px-4 py-3 hover:bg-tumakr-dusty-pink/10 transition-colors duration-200"
                            onClick={() => setToursDropdown(false)}
                          >
                            <div className="font-medium text-gray-900 hover:text-tumakr-maroon transition-colors">
                              {category.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {category.description}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact 드롭다운 메뉴 */}
                  {item.isContact && contactDropdownOpen && (
                    <div
                      className="absolute left-0 top-full pt-2 w-64 z-50"
                      onMouseEnter={() => setContactDropdown(true)}
                      onMouseLeave={() => setContactDropdown(false)}
                    >
                      {/* 
                      개발 후 추가
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                        <Link
                          href="/chat"
                          className="block px-4 py-3 hover:bg-tumakr-dusty-pink/10 transition-colors duration-200"
                          onClick={() => setContactDropdown(false)}
                        >
                          <div className="font-medium text-gray-900 hover:text-tumakr-maroon transition-colors">
                            AI Assistant
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Chat with our AI for instant help
                          </div>
                        </Link>
                        <Link
                          href="/contact"
                          className="block px-4 py-3 hover:bg-tumakr-dusty-pink/10 transition-colors duration-200"
                          onClick={() => setContactDropdown(false)}
                        >
                          <div className="font-medium text-gray-900 hover:text-tumakr-maroon transition-colors">
                            Email Us
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Fill out our contact form
                          </div>
                        </Link>
                      </div> */}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-tumakr-maroon transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tumakr-maroon transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            )}
          </div>

          {/* 우측 아이콘 섹션 */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {/* 검색 아이콘 */}
            <button
              onClick={toggleSearch}
              className="hover:text-tumakr-maroon cursor-pointer transition-colors duration-300 p-2 rounded-full hover:bg-tumakr-dusty-pink/10"
              title="검색"
              aria-label="검색 열기"
            >
              <Search className="w-5 h-5 stroke-2" />
            </button>

            {/* 예약 조회 - 로그인 상태와 무관하게 항상 표시, 개발 후 추가*/}
            {/* <Link
              href="/orders"
              className="hover:text-tumakr-maroon transition-colors duration-300 p-2 flex items-center space-x-1 rounded-full hover:bg-tumakr-dusty-pink/10"
              title="예약 조회"
            >
              <ClipboardList className="w-5 h-5 stroke-2" />
              <span className="hidden md:inline text-xs">Orders</span>
            </Link> */}

            {!isAuthenticated ? (
              // 로그인 전: 로그인 버튼 표시
              <Link
                href="/login"
                className="hover:text-tumakr-maroon transition-colors duration-300 p-2 flex items-center space-x-1 rounded-full hover:bg-tumakr-dusty-pink/10"
                title="로그인"
              >
                <LogIn className="w-5 h-5 stroke-2 cursor-pointer" />
                <span className="hidden md:inline text-xs">Login</span>
              </Link>
            ) : (
              // 로그인 후: 사용자 드롭다운 메뉴
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="cursor-pointer hover:text-tumakr-maroon transition-colors duration-300 p-2 flex items-center space-x-1 rounded-full hover:bg-tumakr-dusty-pink/10"
                  title="사용자 메뉴"
                >
                  <User className="w-5 h-5 stroke-2" />
                  <span className="hidden md:inline text-xs max-w-[80px] truncate">
                    {authUser?.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className="w-3 h-3 stroke-2" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {authUser?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {authUser?.email || authUser?.username}
                      </p>
                    </div>
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-tumakr-dusty-pink/10 hover:text-tumakr-maroon"
                      onClick={() => dispatch({ type: "CLOSE_USER_DROPDOWN" })}
                    >
                      My Page
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-tumakr-dusty-pink/10 hover:text-tumakr-maroon"
                      onClick={() => dispatch({ type: "CLOSE_USER_DROPDOWN" })}
                    >
                      Order History
                    </Link>
                    <Link
                      href="/wishlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-tumakr-dusty-pink/10 hover:text-tumakr-maroon"
                      onClick={() => dispatch({ type: "CLOSE_USER_DROPDOWN" })}
                    >
                      Wishlist
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <button
              className="lg:hidden text-gray-600 hover:text-tumakr-maroon transition-colors duration-300 cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="모바일 메뉴 토글"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 검색창 */}
      {searchOpen && (
        <div className="w-full py-4 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
                }
                placeholder="Search for tours, destinations, and products..."
                className="flex-1 text-gray-900 px-4 py-2 border border-tumakr-sage-green rounded-full focus:outline-none  focus:ring-2 focus:ring-tumakr-maroon"
                autoFocus
              />
              <Button
                type="submit"
                className="bg-tumakr-maroon hover:bg-tumakr-maroon/90 text-white px-6 py-2 rounded-full"
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full py-4 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col space-y-4 text-sm text-gray-600">
              {/* Tours 카테고리 */}
              <div className="border-b border-gray-100 pb-2">
                <Link
                  href="/tours"
                  className="hover:text-tumakr-maroon transition-colors duration-300 py-2 font-medium block"
                  onClick={() => closeMobileMenu()}
                >
                  Tours
                </Link>
                <div className="pl-4 space-y-2 mt-2">
                  {tourCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="block py-1 text-xs text-gray-500 hover:text-tumakr-maroon transition-colors"
                      onClick={() => closeMobileMenu()}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Souvenir 메뉴 - 개발 후 추가*/}
              {/* <Link
                href="/souvenir"
                className="hover:text-tumakr-maroon transition-colors duration-300 py-2"
                onClick={() => closeMobileMenu()}
              >
                Souvenir
              </Link> */}

              {/* Contact 카테고리 */}
              <Link
                href="/contact"
                className="hover:text-tumakr-maroon transition-colors duration-300 py-2"
                onClick={() => closeMobileMenu()}
              >
                Contact
              </Link>

              {/* <div className="border-b border-gray-100 pb-2">
                <div className="py-2 font-medium text-gray-900">Contact</div>
                <div className="pl-4 space-y-2 mt-2">
                  <Link
                    href="/chat"
                    className="block py-1 text-xs text-gray-500 hover:text-tumakr-maroon transition-colors"
                    onClick={() => closeMobileMenu()}
                  >
                    AI Assistant
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-1 text-xs text-gray-500 hover:text-tumakr-maroon transition-colors"
                    onClick={() => closeMobileMenu()}
                  >
                    Email Us
                  </Link>
                </div>
              </div> */}

              {/* Orders - 로그인 상태와 무관하게 항상 표시 - 개발 후 추가 */}
              {/* <Link
                href="/orders"
                className="hover:text-tumakr-maroon transition-colors duration-300 py-2"
                onClick={() => closeMobileMenu()}
              >
                Orders
              </Link> */}

              {!isAuthenticated ? (
                // 비로그인: 로그인 링크만 표시
                <Link
                  href="/login"
                  className="hover:text-tumakr-maroon transition-colors duration-300 py-2"
                  onClick={() => closeMobileMenu()}
                >
                  Login
                </Link>
              ) : (
                // 로그인: 마이페이지, 위시리스트, 로그아웃
                <>
                  <Link
                    href="/mypage"
                    className="hover:text-tumakr-maroon transition-colors duration-300 py-2"
                    onClick={() => closeMobileMenu()}
                  >
                    My Page
                  </Link>
                  <Link
                    href="/wishlist"
                    className="hover:text-tumakr-maroon transition-colors duration-300 py-2"
                    onClick={() => closeMobileMenu()}
                  >
                    Wishlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="cursor-pointer text-left hover:text-red-600 transition-colors duration-300 py-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
