import type React from "react"

interface WordDisplayProps {
  hintWord: string
  isCompleted: boolean
  targetWord: string
  userInput: string
}

const WordDisplay: React.FC<WordDisplayProps> = ({ targetWord, hintWord, userInput, isCompleted }) => {
  // Determine which characters are correct
  const renderCharacters = () => {
    return targetWord.split("").map((char, index) => {
      const isCorrect = index < userInput.length && userInput[index] === char
      const isWrong = index < userInput.length && userInput[index] !== char
      const isCurrent = index === userInput.length

      return (
        <span
          key={index}
          className={`text-4xl font-bold inline-block mx-1 ${isCorrect
            ? "text-green-600"
            : isWrong
              ? "text-red-600"
              : isCurrent
                ? "text-blue-600 border-b-4 border-blue-600 animate-pulse"
                : "text-gray-800"
            }`}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <div className="mb-4">
      <div className="text-center mb-1 text-sm text-gray-600">Type this word</div>
      <div className="flex justify-center flex-wrap mb-3">{renderCharacters()}</div>
      <div className="text-center mb-1 text-sm text-gray-600">{hintWord}</div>
      <div className="bg-gray-50 p-3 rounded-lg text-center min-h-14 flex items-center justify-center">
        <span className={`text-xl ${isCompleted ? "text-green-600 font-bold" : "text-gray-800"}`}>
          {userInput || ""}
        </span>
      </div>
    </div>
  )
}

export default WordDisplay
