// Declare the flutter_inappwebview property on the Window interface
declare global {
  interface Window {
    flutter_inappwebview?: {
      callHandler: (message: string, json: string) => void;
      // Add other methods or properties if needed
    };
    flutter_subscription_status?: (isSubscribed: boolean) => void;
  }
}

// Export {} to make this file a module.
// This is necessary for the `declare global` block to work correctly.
export { };
