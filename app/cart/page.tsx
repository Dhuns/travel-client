"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

/**
 * 장바구니 페이지 컴포넌트
 *
 * 주요 기능:
 * - 장바구니 아이템 목록 표시
 * - 수량 변경 및 삭제 기능
 * - 총 금액 계산
 * - 결제 페이지로 이동
 *
 * 백엔드 연동 가이드:
 * - GET /api/cart - 장바구니 아이템 조회
 * - PUT /api/cart/{itemId} - 수량 변경
 * - DELETE /api/cart/{itemId} - 아이템 삭제
 * - POST /api/checkout - 결제 프로세스 시작
 */

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export default function CartPage() {
  // 임시 장바구니 데이터 (백엔드 연동 시 API에서 조회)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Seoul Highlights Full Day Tour",
      price: 89,
      quantity: 2,
      image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
      category: "Tour",
    },
    {
      id: "2",
      name: "Korean Traditional Hanbok Rental",
      price: 120,
      quantity: 1,
      image: "/beautiful-korean-traditional-hanbok-dress.jpg",
      category: "Rental",
    },
    {
      id: "3",
      name: "K-Beauty Skincare Set",
      price: 45,
      quantity: 1,
      image: "/korean-skincare-beauty-products-set.jpg",
      category: "Goods",
    },
  ])

  // 수량 변경 함수
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    // TODO: 백엔드 API 호출
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // 아이템 삭제 함수
  const removeItem = (id: string) => {
    // TODO: 백엔드 API 호출
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  // 총 금액 계산
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty.</h1>
            <p className="text-gray-600 mb-8">Explore a variety of Korea tours and products, and add them to your cart.</p>
            <div className="space-y-4">
              <Link href="/tours">
                <Button className="bg-[#651d2a] hover:bg-[#4a1520] text-white px-8 py-3 rounded-full">Explore Tours</Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="border-[#651d2a] text-[#651d2a] hover:bg-[#f5f3f0] px-8 py-3 rounded-full bg-transparent">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-6 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-[#651d2a] hover:text-[#4a1520]">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Cart</h1>
            <span className="bg-[#f5f3f0] text-[#651d2a] px-3 py-1 rounded-full text-sm font-medium">
              {totalItems} items
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 장바구니 아이템 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  {/* 상품 이미지 */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="inline-block bg-[#f5f3f0] text-[#651d2a] text-xs px-2 py-1 rounded-full mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-xl font-bold text-[#651d2a]">${item.price.toLocaleString()}</p>
                      </div>

                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="삭제"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* 수량 조절 */}
                    <div className="flex items-center space-x-3 mt-4">
                      <span className="text-sm text-gray-600">Qty:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-lg font-semibold text-gray-900 ml-auto">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-[#651d2a]">${totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[#651d2a] hover:bg-[#4a1520] text-white py-3 rounded-full text-lg font-semibold">
                  Proceed to Checkout
                </Button>
                <Link href="/tours">
                  <Button
                    variant="outline"
                    className="w-full border-[#651d2a] text-[#651d2a] hover:bg-[#f5f3f0] py-3 rounded-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* 혜택 정보 */}
              <div className="mt-6 p-4 bg-[#f5f3f0] rounded-lg">
                <h3 className="font-semibold text-[#651d2a] mb-2">🎁 Special Offers</h3>
                  <ul className="text-sm text-[#7a2433] space-y-1">
                    <li>• 5% discount on purchases over 100,000 KRW</li>
                    <li>• Free shipping for first-time customers</li>
                    <li>• Earn reward points when you leave a review</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
