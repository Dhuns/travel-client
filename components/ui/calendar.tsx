"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
}

export function Calendar({ selected, onSelect, disabled, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  // 월의 첫 번째 날과 마지막 날
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  // 달력 시작 날짜 (이전 달의 마지막 주 포함)
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay())

  // 달력 끝 날짜 (다음 달의 첫 주 포함)
  const endDate = new Date(lastDayOfMonth)
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()))

  const days = []
  const currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    // 비활성화된 날짜는 선택 불가
    if (disabled ? disabled(date) : isPastDate(date)) return
    onSelect?.(date)
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selected && date.toDateString() === selected.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month
  }

  const isPastDate = (date: Date) => {
    return date < today
  }

  const isDateDisabled = (date: Date) => {
    // 외부에서 전달된 disabled 함수가 있으면 사용, 없으면 isPastDate 사용
    if (disabled) {
      return disabled(date)
    }
    return isPastDate(date)
  }

  return (
    <div className={cn("p-4 bg-white border rounded-lg shadow-sm", className)}>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="h-8 w-8 p-0 hover:bg-sky-50">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-lg font-semibold text-gray-900">
          {monthNames[month]} {year}
        </h2>

        <Button variant="ghost" size="sm" onClick={goToNextMonth} className="h-8 w-8 p-0 hover:bg-sky-50">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            disabled={isDateDisabled(date)}
            className={cn(
              "h-8 w-8 text-sm rounded-md transition-colors",
              "hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1",
              {
                // 현재 월이 아닌 날짜
                "text-gray-300": !isCurrentMonth(date),
                // 현재 월의 날짜
                "text-gray-900": isCurrentMonth(date) && !isDateDisabled(date),
                // 비활성화된 날짜
                "text-gray-300 cursor-not-allowed": isDateDisabled(date),
                // 오늘
                "bg-sky-100 text-sky-700 font-semibold": isToday(date) && !isSelected(date),
                // 선택된 날짜
                "bg-sky-600 text-white font-semibold": isSelected(date),
                // 호버 효과 (비활성화된 날짜 제외)
                "hover:bg-sky-50": !isDateDisabled(date) && !isSelected(date),
              },
            )}
          >
            {date.getDate()}
          </button>
        ))}
      </div>

      {/* 하단 정보 */}
      <div className="mt-4 pt-3 border-t text-xs text-gray-500">
        <p>• Past dates are not available for booking</p>
        <p>• Select your preferred tour date</p>
      </div>
    </div>
  )
}
