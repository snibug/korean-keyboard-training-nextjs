"use client"

import { useState, useEffect } from "react"

import AppBar from "./components/app-bar"
import KoreanKeyboard from "@/components/korean-keyboard"
import Timer from "@/components/timer"
import WordDisplay from "@/components/word-display"
import { HangulComposer } from "@/lib/hangul-utils"
import { getRandomWord } from "@/lib/words"

export default function Home() {
  const [currentWord, setCurrentWord] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  const [timerRunning, setTimerRunning] = useState(false)
  const [completionTime, setCompletionTime] = useState<number | null>(null)
  const [hangulComposer] = useState(() => new HangulComposer())
  const [resetKeyboardMode, setResetKeyboardMode] = useState(false)

  useEffect(() => {
    // Initialize with a random word
    setCurrentWord(getRandomWord())
  }, [])

  const handleKeyPress = (char: string) => {
    // Start timer on first key press
    if (!timerRunning && !isCompleted) {
      console.log("Starting timer")
      setTimerRunning(true)
    }

    let newInput = ""

    if (char === "⌫") {
      // Backspace
      newInput = hangulComposer.backspace()
    } else {
      // Regular character input
      newInput = hangulComposer.input(char)
    }

    setUserInput(newInput)

    // Check if word is completed
    if (newInput === currentWord) {
      console.log("Word completed")
      setIsCompleted(true)
      setTimerRunning(false)
    }
  }

  const handleConfirm = () => {
    if (isCompleted) {
      // When completed, move to next word
      handleNextWord()
    } else {
      // When not completed, finalize current input (if needed)
      const finalizedInput = hangulComposer.finalize()
      setUserInput(finalizedInput)

      // Check completion after finalization
      if (finalizedInput === currentWord) {
        console.log("Word completed after confirmation")
        setIsCompleted(true)
        setTimerRunning(false)
      }
    }
  }

  const handleNextWord = () => {
    console.log("Moving to next word")
    // Create new Hangul composer
    const newComposer = new HangulComposer()
    // Reset state
    setCurrentWord(getRandomWord())
    setUserInput("")
    setIsCompleted(false)
    setCompletionTime(null)
    setTimerRunning(false)
    // Reset keyboard to basic mode
    setResetKeyboardMode(prev => !prev)
    // Reset hangulComposer (can't replace with new instance, so just reset internal state)
    Object.assign(hangulComposer, newComposer)
  }

  const handleTimerComplete = (time: number) => {
    console.log("Timer completed with time:", time)
    setCompletionTime(time)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background fixed inset-0 overflow-hidden">
      <AppBar />
      <div className="w-full h-[calc(100%-3.5rem)] flex flex-col max-w-md mx-auto">
        {/* Content area - scrollable if needed */}
        <div className="flex-1 overflow-y-auto flex flex-col mb-2">
          <div className="w-full bg-card rounded-lg shadow-sm pb-4 mb-auto">
            <WordDisplay targetWord={currentWord} userInput={userInput} isCompleted={isCompleted} />

            <Timer isRunning={timerRunning} onComplete={handleTimerComplete} isCompleted={isCompleted} />

            {isCompleted && completionTime && (
              <div className="mt-2 text-center">
                <p className="text-green-600 font-bold">Completed! Time: {(completionTime / 1000).toFixed(2)}s</p>
              </div>
            )}
          </div>
        </div>

        {/* Keyboard area - fixed at bottom */}
        <div className="flex-none w-full mb-safe">
          <KoreanKeyboard
            onKeyPress={handleKeyPress}
            onConfirm={handleConfirm}
            isCompleted={isCompleted}
            resetToBasicMode={resetKeyboardMode}
          />
        </div>
      </div>
    </div>
  )
}
