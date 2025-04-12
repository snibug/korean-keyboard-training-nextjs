"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const AppBar: React.FC = () => {
  return (
    <header className="flex justify-between items-center border-b px-4 py-2 h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center">
        <h1 className="text-lg font-medium">KOREAN TYPING</h1>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/subscribe">
          <Button variant="outline" size="sm">
            Subscribe
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default AppBar;
