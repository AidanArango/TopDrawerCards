"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "Our approach", href: "/#about" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Top Drawer Cards home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/top-drawer-logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="brand-logo"
          />
          <span className="brand-name">
            TOP DRAWER
            <span>CARDS</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
