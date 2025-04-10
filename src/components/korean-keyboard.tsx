"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface KeyboardKey {
  char: string
  width?: number
  isSpecial?: boolean
}

interface KoreanKeyboardProps {
  onKeyPress: (char: string) => void
  onConfirm: () => void
  isCompleted: boolean
  resetToBasicMode?: boolean
}

const KoreanKeyboard: React.FC<KoreanKeyboardProps> = ({ onKeyPress, onConfirm, isCompleted, resetToBasicMode }) => {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [showDoubleConsonants, setShowDoubleConsonants] = useState(false)

  // Reset to basic mode effect
  React.useEffect(() => {
    if (resetToBasicMode) {
      setShowDoubleConsonants(false)
    }
  }, [resetToBasicMode])

  // 기본 자음 모음 배열
  const defaultLayout: KeyboardKey[][] = [
    [
      { char: "ㅂ" },
      { char: "ㅈ" },
      { char: "ㄷ" },
      { char: "ㄱ" },
      { char: "ㅅ" },
      { char: "ㅛ" },
      { char: "ㅕ" },
      { char: "ㅑ" },
      { char: "ㅐ" },
      { char: "ㅔ" },
    ],
    [
      { char: "ㅁ" },
      { char: "ㄴ" },
      { char: "ㅇ" },
      { char: "ㄹ" },
      { char: "ㅎ" },
      { char: "ㅗ" },
      { char: "ㅓ" },
      { char: "ㅏ" },
      { char: "ㅣ" },
    ],
    [
      { char: "ㅋ" },
      { char: "ㅌ" },
      { char: "ㅊ" },
      { char: "ㅍ" },
      { char: "ㅠ" },
      { char: "ㅜ" },
      { char: "ㅡ" },
      { char: "⌫", width: 1.5, isSpecial: true },
    ],
    [
      { char: "쌍자음", width: 2.0, isSpecial: true },
      { char: "space", width: 5, isSpecial: true },
      { char: "확인", width: 2.0, isSpecial: true },
    ],
  ]

  // 쌍자음 및 특수 모음 배열
  const doubleConsonantsLayout: KeyboardKey[][] = [
    [
      { char: "ㅃ" },
      { char: "ㅉ" },
      { char: "ㄸ" },
      { char: "ㄲ" },
      { char: "ㅆ" },
      { char: "ㅛ" },
      { char: "ㅕ" },
      { char: "ㅑ" },
      { char: "ㅐ" },
      { char: "ㅔ" },
    ],
    [
      { char: "ㅁ" },
      { char: "ㄴ" },
      { char: "ㅇ" },
      { char: "ㄹ" },
      { char: "ㅎ" },
      { char: "ㅗ" },
      { char: "ㅓ" },
      { char: "ㅏ" },
      { char: "ㅣ" },
    ],
    [
      { char: "ㅋ" },
      { char: "ㅌ" },
      { char: "ㅊ" },
      { char: "ㅍ" },
      { char: "ㅠ" },
      { char: "ㅜ" },
      { char: "ㅡ" },
      { char: "⌫", width: 1.5, isSpecial: true },
    ],
    [
      { char: "기본", width: 2.0, isSpecial: true },
      { char: "space", width: 5, isSpecial: true },
      { char: "확인", width: 2.0, isSpecial: true },
    ],
  ]

  // 현재 레이아웃 선택
  const keyboardLayout = showDoubleConsonants ? doubleConsonantsLayout : defaultLayout

  // 키보드 모드 전환
  const toggleKeyboardMode = () => {
    setShowDoubleConsonants(!showDoubleConsonants)
  }

  // 키 입력 처리
  const handleKeyClick = (key: string) => {
    setActiveKey(key)

    // 키보드 모드 전환 처리
    if (key === "쌍자음" || key === "기본") {
      toggleKeyboardMode()
      setTimeout(() => {
        setActiveKey(null)
      }, 150)
      return
    }

    // 확인 버튼 처리
    if (key === "확인") {
      onConfirm()
      setTimeout(() => {
        setActiveKey(null)
      }, 150)
      return
    }

    // 일반 키 입력 처리
    let charToSend = key
    if (key === "space") {
      charToSend = " "
    }

    if (charToSend) {
      onKeyPress(charToSend)
    }

    // 시각적 피드백을 위한 지연
    setTimeout(() => {
      setActiveKey(null)
    }, 150)
  }

  return (
    <div className="w-full bg-gray-100 rounded-t-lg p-2 select-none touch-none">
      <div className="text-center mb-1 text-xs font-medium text-gray-600">
        {showDoubleConsonants ? "Double Consonants & Complex Vowels" : "Basic Mode"}
      </div>

      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1">
          {row.map((key) => {
            const isActive = activeKey === key.char
            const width = key.width || 1.1

            // 확인 버튼 스타일 조정
            const isConfirmButton = key.char === "확인"
            const confirmButtonStyle = isCompleted ? "bg-green-500 text-white" : ""

            return (
              <button
                key={key.char}
                type="button"
                className={cn(
                  "keyboard-key relative flex items-center justify-center mx-0.5 h-12 rounded-md shadow-md transition-all",
                  isActive
                    ? "bg-blue-500 text-white transform scale-105 z-10"
                    : isConfirmButton
                      ? confirmButtonStyle
                      : "bg-white text-gray-800",
                  key.isSpecial ? "text-xs font-medium" : "text-lg font-semibold",
                  key.char === " " ? "invisible" : "", // 빈 키는 보이지 않게 처리
                )}
                style={{
                  width: `${width * 2}rem`,
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                }}
                onClick={() => handleKeyClick(key.char)}
              >
                {key.char === "space" ? "SPACE" : key.char === "확인" && isCompleted ? "NEXT" : key.char === "확인" ? "ENTER" : key.char === "쌍자음" ? "DOUBLE" : key.char === "기본" ? "BASIC" : key.char}

                {/* 활성화된 키의 확대 표시 - 모바일에 최적화된 위치 */}
                {isActive && !key.isSpecial && key.char !== " " && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xl font-bold py-1 px-3 rounded-lg shadow-lg">
                    {key.char}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default KoreanKeyboard
