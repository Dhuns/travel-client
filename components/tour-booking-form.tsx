"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

// 투어 데이터 타입 정의
interface Tour {
  id: string
  name: string
  price: number
}

// 투어 활동 타입 정의
interface TourActivity {
  id: string
  name: string
  price?: number
  included?: boolean
}

// 예약 데이터 타입 정의
interface BookingData {
  tourId: string
  date: Date | undefined
  time: string
  people: number
  activities: string[]
  total: number
}

interface TourBookingFormProps {
  tour: Tour
}

/**
 * 투어 예약 폼 컴포넌트
 *
 * 주요 기능:
 * - 날짜/시간 선택
 * - 인원 수 선택
 * - 추가 활동 선택
 * - 가격 계산
 * - 예약 처리
 *
 * 백엔드 연동 가이드:
 * - 예약 API: POST /api/bookings
 * - 가용 날짜 확인: GET /api/tours/{id}/availability
 * - 결제 처리: POST /api/payments
 * - 예약 확인 이메일 발송 기능 필요
 */
export function TourBookingForm({ tour }: TourBookingFormProps) {
  // 상태 관리
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedTime, setSelectedTime] = useState("")
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 투어 활동 목록 - 백엔드에서 동적으로 가져올 수 있음
  const activities: TourActivity[] = useMemo(
    () => [
      { id: "gyeongbokgung", name: "경복궁 투어", included: true },
      { id: "guard", name: "수문장 교대식 관람", price: 0 },
      { id: "hanbok", name: "한복 대여 (전통 의상)", price: 15 },
      { id: "lunch", name: "정통 한식 점심", price: 25 },
      { id: "pickup", name: "역에서 무료 픽업", included: true },
    ],
    [],
  )

  // 가용 시간 목록 - 백엔드에서 동적으로 가져올 수 있음
  const availableTimes = useMemo(
    () => [
      { value: "09:00", label: "오전 09:00" },
      { value: "10:00", label: "오전 10:00" },
      { value: "11:00", label: "오전 11:00" },
      { value: "14:00", label: "오후 02:00" },
    ],
    [],
  )

  // 활동 선택 처리 함수
  const handleActivityChange = useCallback((activityId: string, checked: boolean) => {
    setSelectedActivities((prev) => (checked ? [...prev, activityId] : prev.filter((id) => id !== activityId)))
  }, [])

  // 총 가격 계산 함수
  const calculateTotal = useCallback(() => {
    const basePrice = tour.price * numberOfPeople
    const activityPrice = selectedActivities.reduce((total, activityId) => {
      const activity = activities.find((a) => a.id === activityId)
      return total + (activity?.price || 0) * numberOfPeople
    }, 0)
    return basePrice + activityPrice
  }, [tour.price, numberOfPeople, selectedActivities, activities])

  // 날짜 선택 처리 함수
  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date)
    setShowCalendar(false)
    // TODO: 백엔드 연동 시 선택된 날짜의 가용 시간 조회
    // fetchAvailableTimes(date)
  }, [])

  // 날짜 포맷팅 함수
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }, [])

  // 인원 수 변경 함수
  const updatePeopleCount = useCallback((increment: boolean) => {
    setNumberOfPeople((prev) => {
      if (increment) return Math.min(8, prev + 1) // 최대 8명
      return Math.max(1, prev - 1) // 최소 1명
    })
  }, [])

  // 예약 처리 함수 - 백엔드 API 호출
  const handleBookNow = useCallback(async () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.")
      return
    }

    setIsLoading(true)

    const bookingData: BookingData = {
      tourId: tour.id,
      date: selectedDate,
      time: selectedTime,
      people: numberOfPeople,
      activities: selectedActivities,
      total: calculateTotal(),
    }

    try {
      // TODO: 백엔드 API 호출
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData)
      // })
      //
      // if (response.ok) {
      //   const booking = await response.json()
      //   router.push(`/booking-confirmation/${booking.id}`)
      // } else {
      //   throw new Error('예약 처리 중 오류가 발생했습니다.')
      // }

      console.log("예약 정보:", bookingData)
      alert("예약 기능이 곧 구현될 예정입니다!")
    } catch (error) {
      console.error("예약 오류:", error)
      alert("예약 처리 중 오류가 발생했습니다. 다시 ��도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }, [selectedDate, selectedTime, tour.id, numberOfPeople, selectedActivities, calculateTotal])

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">투어 예약하기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 날짜 선택 섹션 */}
        <div>
          <Label className="text-sm font-medium">날짜 선택</Label>
          <div className="relative mt-1">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full justify-start text-left font-normal"
              aria-label="날짜 선택"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? formatDate(selectedDate) : "날짜를 선택하세요"}
            </Button>

            {showCalendar && (
              <div className="absolute top-full left-0 z-50 mt-1 bg-white border rounded-lg shadow-lg">
                <Calendar
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()} // 과거 날짜 비활성화
                />
              </div>
            )}
          </div>
        </div>

        {/* 시간 선택 섹션 */}
        <div>
          <Label className="text-sm font-medium">시간 선택</Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="시간을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((time) => (
                <SelectItem key={time.value} value={time.value}>
                  {time.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 인원 수 선택 섹션 */}
        <div>
          <Label className="text-sm font-medium">인원 수</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePeopleCount(false)}
              disabled={numberOfPeople <= 1}
              aria-label="인원 수 감소"
            >
              -
            </Button>
            <span className="px-4 py-2 border rounded text-center min-w-[60px]">{numberOfPeople}명</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updatePeopleCount(true)}
              disabled={numberOfPeople >= 8}
              aria-label="인원 수 증가"
            >
              +
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">투어당 최대 8명까지 가능합니다</p>
        </div>

        {/* 투어 활동 선택 섹션 */}
        <div>
          <Label className="text-sm font-medium">투어 활동</Label>
          <div className="space-y-3 mt-2">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-2">
                <Checkbox
                  id={activity.id}
                  checked={activity.included || selectedActivities.includes(activity.id)}
                  disabled={activity.included}
                  onCheckedChange={(checked) => handleActivityChange(activity.id, checked as boolean)}
                />
                <div className="flex-1">
                  <label
                    htmlFor={activity.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {activity.name}
                  </label>
                  {activity.included && <span className="text-xs text-green-600 ml-2">(포함됨)</span>}
                  {activity.price && activity.price > 0 && (
                    <span className="text-xs text-gray-500 ml-2">(+${activity.price})</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 환불 정책 안내 */}
        <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
          <h4 className="font-semibold mb-1">환불 정책</h4>
          <p>투어 24시간 전까지 무료 취소 가능</p>
          <p>역에서 무료 픽업 서비스 제공</p>
        </div>

        {/* 가격 상세 내역 */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>기본 가격 (1인당)</span>
            <span>${tour.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>인원 수</span>
            <span>{numberOfPeople}명</span>
          </div>
          {selectedActivities.length > 0 && (
            <div className="flex justify-between text-sm">
              <span>추가 활동</span>
              <span>
                $
                {selectedActivities.reduce((total, activityId) => {
                  const activity = activities.find((a) => a.id === activityId)
                  return total + (activity?.price || 0) * numberOfPeople
                }, 0)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>총 가격</span>
            <span className="text-sky-600">${calculateTotal()}</span>
          </div>
        </div>

        {/* 예약 버튼 */}
        <Button
          className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3"
          onClick={handleBookNow}
          disabled={isLoading || !selectedDate || !selectedTime}
        >
          {isLoading ? "예약 처리 중..." : `지금 예약하기 - $${calculateTotal()}`}
        </Button>

        <p className="text-xs text-gray-500 text-center">투어 24시간 전까지 무료 취소 가능</p>
      </CardContent>
    </Card>
  )
}
