"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface KeyboardKey {
  char: string
  width?: number
  isSpecial?: boolean
}

interface KoreanKeyboardProps {
  onKeyPress: (char: string) => void;
  onConfirm: () => void;
  isCompleted: boolean;
  resetToBasicMode?: boolean;
}

const defaultLayout: KeyboardKey[][] = [
  [{ char: "ㅂ" }, { char: "ㅈ" }, { char: "ㄷ" }, { char: "ㄱ" }, { char: "ㅅ" }, { char: "ㅛ" }, { char: "ㅕ" }, { char: "ㅑ" }, { char: "ㅐ" }, { char: "ㅔ" },],
  [{ char: "ㅁ" }, { char: "ㄴ" }, { char: "ㅇ" }, { char: "ㄹ" }, { char: "ㅎ" }, { char: "ㅗ" }, { char: "ㅓ" }, { char: "ㅏ" }, { char: "ㅣ" },],
  [{ char: "ㅋ" }, { char: "ㅌ" }, { char: "ㅊ" }, { char: "ㅍ" }, { char: "ㅠ" }, { char: "ㅜ" }, { char: "ㅡ" }, { char: "DEL", width: 1.5, isSpecial: true },],
  [{ char: "SHIFT1", width: 2.0, isSpecial: true }, { char: "space", width: 5, isSpecial: true }, { char: "CONFIRM", width: 2.0, isSpecial: true },],
];

const doubleConsonantsLayout: KeyboardKey[][] = [
  [{ char: "ㅃ" }, { char: "ㅉ" }, { char: "ㄸ" }, { char: "ㄲ" }, { char: "ㅆ" }, { char: "ㅛ" }, { char: "ㅕ" }, { char: "ㅑ" }, { char: "ㅒ" }, { char: "ㅖ" },],
  [{ char: "ㅁ" }, { char: "ㄴ" }, { char: "ㅇ" }, { char: "ㄹ" }, { char: "ㅎ" }, { char: "ㅗ" }, { char: "ㅓ" }, { char: "ㅏ" }, { char: "ㅣ" },],
  [{ char: "ㅋ" }, { char: "ㅌ" }, { char: "ㅊ" }, { char: "ㅍ" }, { char: "ㅠ" }, { char: "ㅜ" }, { char: "ㅡ" }, { char: "DEL", width: 1.5, isSpecial: true },],
  [{ char: "SHIFT2", width: 2.0, isSpecial: true }, { char: "space", width: 5, isSpecial: true }, { char: "CONFIRM", width: 2.0, isSpecial: true },],
];


// React.memo로 컴포넌트를 감싸서 props가 변경되지 않으면 리렌더링 방지
const KoreanKeyboard: React.FC<KoreanKeyboardProps> = React.memo(({
  onKeyPress,
  onConfirm,
  isCompleted,
  resetToBasicMode
}) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showDoubleConsonants, setShowDoubleConsonants] = useState(false);
  const isTouchingRef = useRef(false); // Track if a touch interaction is in progress
  const lastMoveTimeRef = useRef(0); // Ref to store the timestamp of the last processed move event
  const throttleInterval = 50; // Throttle interval in milliseconds (e.g., 50ms)

  const keyboardContainerRef = useRef<HTMLDivElement>(null); // Ref for the main container

  // Reset to basic mode effect
  useEffect(() => {
    if (resetToBasicMode) {
      setShowDoubleConsonants(false);
    }
  }, [resetToBasicMode]);

  const keyboardLayout = showDoubleConsonants ? doubleConsonantsLayout : defaultLayout;

  // Helper function to get key from element by finding the closest button ancestor
  const getKeyFromElement = useCallback((element: Element | null): string | null => {
    if (element) {
      // Find the closest ancestor button with the specific class
      const button = element.closest('.keyboard-key-button');
      // Return the data-key attribute if the button is found
      return button?.getAttribute('data-key') || null;
    }
    return null;
  }, []); // No dependencies, this is a pure function based on DOM structure

  // **수정 1: toggleKeyboardMode를 useCallback으로 감싸기**
  const toggleKeyboardMode = useCallback(() => {
    setShowDoubleConsonants(prev => !prev);
  }, []); // setShowDoubleConsonants는 안정적이므로 의존성 배열은 비어있음

  // 진동 함수 (네이티브 브릿지 호출)
  const vibrate = useCallback(() => {
    if (typeof window !== 'undefined' && window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler("flutterBridge", JSON.stringify({
        action: "vibrate",
        type: 'light',
      }));
    }
  }, []);

  // Called when touch starts *on a button*
  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLButtonElement>) => {
    // event.preventDefault(); // Removed: Handled by touch-action CSS property
    if (isTouchingRef.current) return; // Ignore if already touching
    isTouchingRef.current = true;

    // Get the key from the button element that received the touchstart event
    const key = getKeyFromElement(event.currentTarget);
    if (key) {
      setActiveKey(key); // Set initial active key
    }
    // No action (like key press) is taken here, only on touch end
  }, [getKeyFromElement]); // Depends on the helper function

  // Called when touch moves *over the container*, throttled for performance
  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchingRef.current) return; // Only process if currently touching

    const now = Date.now();
    // Throttle the execution: Only run if enough time has passed since the last execution
    if (now - lastMoveTimeRef.current < throttleInterval) {
      return; // Skip execution if throttled
    }
    lastMoveTimeRef.current = now; // Update the last execution time

    // event.preventDefault(); // Removed: Handled by touch-action CSS property

    const touch = event.touches[0];
    if (!touch) return;

    // Find the element currently under the finger
    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    // Get the associated key (if any)
    const key = getKeyFromElement(elementUnderTouch);

    // Update active key only if it has changed
    setActiveKey(prevActiveKey => key !== prevActiveKey ? key : prevActiveKey);

  }, [getKeyFromElement, throttleInterval]); // Add throttleInterval to dependencies

  // Called when touch ends *anywhere on the container*
  const handleTouchEnd = useCallback(() => {
    if (!isTouchingRef.current) return; // Only process if a touch was active

    const keyToProcess = activeKey; // Get the last active key

    if (keyToProcess) {
      // Perform action based on the final key
      if (keyToProcess === "SHIFT1" || keyToProcess === "SHIFT2") {
        toggleKeyboardMode();
      } else if (keyToProcess === "CONFIRM") {
        onConfirm();
      } else if (keyToProcess === "DEL") {
        onKeyPress("DEL"); // Send "DEL" specifically
      } else {
        const charToSend = keyToProcess === "space" ? " " : keyToProcess;
        onKeyPress(charToSend);
      }

      vibrate(); // Trigger vibration feedback
    }

    // Immediately deactivate the key visually
    setActiveKey(null);

    isTouchingRef.current = false; // Mark touch interaction as ended
  }, [activeKey, onConfirm, onKeyPress, toggleKeyboardMode]); // Dependencies include state and callbacks

  // Called when touch is cancelled *anywhere on the container*
  const handleTouchCancel = useCallback(() => {
    if (!isTouchingRef.current) return;

    // Immediately deactivate the key visually
    setActiveKey(null);

    isTouchingRef.current = false; // Mark touch interaction as ended
  }, []); // No dependencies needed

  // --- Render ---
  return (
    <div
      ref={keyboardContainerRef} // Add ref to the container
      className="w-full bg-gray-100 rounded-t-lg p-2 select-none" // Removed touch-manipulation class
      style={{ touchAction: 'none' }} // Apply touch-action: none directly
      // Attach touch move, end, and cancel handlers to the container
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      <div className="text-center mb-1 text-xs font-medium text-gray-600">
        {showDoubleConsonants ? "Double Consonants & Complex Vowels" : "Basic Mode"}
      </div>

      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1">
          {row.map((key) => {
            const isActive = activeKey === key.char;
            const width = key.width || 1.1;
            const isConfirmButton = key.char === "CONFIRM";
            const confirmButtonStyle = isCompleted ? "bg-green-500 hover:bg-green-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white";
            const shiftActiveStyle = (key.char === 'SHIFT1' || key.char === 'SHIFT2') && showDoubleConsonants && !isActive ? "bg-blue-600 text-white" : "";

            return (
              <button
                key={key.char}
                type="button"
                data-key={key.char} // Add data-key attribute for identification
                className={cn(
                  // Add a common class for easy selection in the helper function
                  "keyboard-key keyboard-key-button relative flex items-center justify-center mx-0.5 h-12 rounded-md shadow-md transition-all duration-75 ease-out",
                  isActive
                    ? "bg-blue-500 text-black transform scale-110 z-10 ring-2 ring-blue-500"
                    : isConfirmButton
                      ? confirmButtonStyle
                      : shiftActiveStyle
                        ? shiftActiveStyle
                        : "bg-white hover:bg-gray-200 text-gray-800",
                  key.isSpecial ? "text-xs font-medium" : "text-lg font-semibold",
                )}
                style={{
                  width: `${width * 2}rem`,
                  WebkitTapHighlightColor: 'transparent', // Prevent tap highlight on iOS/Webkit
                }}
                // Attach the touch start handler directly to the button.
                // Pass the event object to the handler.
                onTouchStart={handleTouchStart}
                // Prevent default mouse events (like click) from firing after touch events
                // on some desktop browsers emulating touch, which could cause double actions.
                onMouseDown={(e) => e.preventDefault()}
              // TouchMove, TouchEnd, TouchCancel are now handled by the parent container.
              >
                {(() => {
                  if (key.char === "space") return "SPACE";
                  if (key.char === "CONFIRM") return isCompleted ? "NEXT" : "ENTER";
                  if (key.char === "SHIFT1" || key.char === "SHIFT2") return "SHIFT";
                  if (key.char === "DEL") return "DEL";
                  return key.char;
                })()}

                {isActive && !key.isSpecial && key.char !== "space" && key.char !== "DEL" && (
                  <div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-2xl font-bold py-2 px-4 rounded-lg shadow-xl pointer-events-none"
                    style={{ minWidth: '2.5rem', textAlign: 'center' }}
                  >
                    {key.char}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
});

KoreanKeyboard.displayName = 'KoreanKeyboard';

export default KoreanKeyboard;
