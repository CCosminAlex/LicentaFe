import React from "react";
import Link from "next/link";
import router from "next/router";

export default function Navbar() {
  return (
    <nav className="bg-slate-700 sticky">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-16">
          <Link href="/page1">0</Link>
          <Link href="/page2">1</Link>
          <Link href="/page2">2</Link>
          <Link href="/page2">3</Link>
          <Link href="/page2">4</Link>
          <Link href="/page2">5</Link>
        </div>
      </div>
    </nav>
  );
}