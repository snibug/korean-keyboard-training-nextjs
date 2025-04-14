"use client"

import { useEffect } from "react"

import AppBar from "./components/app-bar"
import { useIsSubscribed } from "@/hooks/use-subscription"

export default function Home() {
  const [, setIsSubscribed] = useIsSubscribed()

  useEffect(() => {
    if (window.flutter_inappwebview) {
      window.flutter_subscription_status = (isSubscribed: boolean) => {
        setIsSubscribed(isSubscribed);
      };

      window.flutter_inappwebview.callHandler('flutterBridge', JSON.stringify({
        action: 'onInitialized',
      }));
    }

    return () => {
      delete window.flutter_subscription_status;
    };
  }, [setIsSubscribed])

  return (
    <div className="flex min-h-screen flex-col bg-background fixed inset-0 overflow-hidden">
      <AppBar />
      <div className="w-full h-[calc(100%-3.5rem)] flex flex-col max-w-md mx-auto">
        {/* Content area - scrollable if needed */}
        <div className="flex-1 overflow-y-auto flex flex-col mb-2">
          <div className="w-full bg-card rounded-lg shadow-sm pb-4 mb-auto">
          </div>
        </div>

      </div>
    </div>
  )
}
