"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface TimerProps {
  isRunning: boolean
  isCompleted: boolean
  onComplete: (time: number) => void
}

const Timer: React.FC<TimerProps> = ({ isRunning, isCompleted, onComplete }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  // Timer execution logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined

    if (isRunning) {
      // Start or continue running timer
      const startTime = Date.now() - elapsedTime

      intervalId = setInterval(() => {
        const currentElapsed = Date.now() - startTime
        setElapsedTime(currentElapsed)
      }, 10)

      console.log("Timer started/running")
    } else if (isCompleted && elapsedTime > 0) {
      // Stop timer and handle completion
      console.log("Timer completed with time:", elapsedTime)
      onComplete(elapsedTime)
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, isCompleted, elapsedTime, onComplete])

  // Reset for new word
  useEffect(() => {
    if (!isRunning && !isCompleted) {
      console.log("Timer reset")
      setElapsedTime(0)
    }
  }, [isRunning, isCompleted])

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="text-center my-2">
      <div className="text-sm text-gray-600 mb-1">Time</div>
      <div
        className={`text-xl font-mono font-bold ${
          isRunning ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-800"
        }`}
      >
        {formatTime(elapsedTime)}
      </div>
    </div>
  )
}

export default Timer
