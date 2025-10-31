"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TimeOption {
  value: string
  label: string
  description: string
}

interface TimeSelectorProps {
  options: TimeOption[]
  selected?: string
  onSelect?: (value: string) => void
  placeholder?: string
  className?: string
}

export function TimeSelector({
  options,
  selected,
  onSelect,
  placeholder = "Choose your preferred time",
  className,
}: TimeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === selected)

  const handleSelect = (value: string) => {
    onSelect?.(value)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg",
          "hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500",
          "transition-colors duration-200",
          {
            "border-sky-400": isOpen,
          },
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            {selectedOption ? (
              <div>
                <div className="font-medium text-gray-900">{selectedOption.label}</div>
                <div className="text-sm text-gray-500">{selectedOption.description}</div>
              </div>
            ) : (
              <div className="text-gray-500">{placeholder}</div>
            )}
          </div>
          <ChevronDown
            className={cn("h-5 w-5 text-gray-400 transition-transform duration-200", { "rotate-180": isOpen })}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn("w-full px-4 py-3 text-left hover:bg-sky-50 transition-colors", {
                  "bg-sky-50 text-sky-700": selected === option.value,
                })}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 클릭 외부 영역 감지를 위한 오버레이 */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
