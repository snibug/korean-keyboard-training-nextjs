import type { Metadata } from 'next'

import './globals.css'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";


export const metadata: Metadata = {
  title: 'Korean Keyboard Practice',
  description: 'Mobile app for practicing Korean typing',
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen touch-manipulation">
        {children}
      </body>
    </html>
  )
}
