"use client"

import * as React from "react"
import Link from "next/link"

import { MainNavItem } from "types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"
import { PolarisMark } from "@/components/landing/polaris-mark"

interface SiteHeaderProps {
  items: MainNavItem[]
}

/**
 * Floating navigation. Scroll effects set `data-tone`: "top" while the page
 * is at rest, then "night" or "paper" to match the section underneath.
 */
export function SiteHeader({ items }: SiteHeaderProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header
      data-site-header
      data-tone="top"
      className="group fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={cn(
          "relative z-10 mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-transparent pl-5 pr-2 text-paper transition-[background-color,border-color,color,box-shadow] duration-500 ease-smooth",
          "group-data-[tone=night]:border-white/10 group-data-[tone=night]:bg-ink/55 group-data-[tone=night]:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] group-data-[tone=night]:backdrop-blur-xl",
          "group-data-[tone=paper]:border-ink/10 group-data-[tone=paper]:bg-paper/80 group-data-[tone=paper]:text-ink group-data-[tone=paper]:shadow-[0_10px_40px_-16px_rgba(5,11,22,0.25)] group-data-[tone=paper]:backdrop-blur-xl",
          open && "!border-transparent !bg-transparent !text-paper !shadow-none"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <PolarisMark className="h-[18px] w-[18px]" />
          <span className="font-heading text-[15px] font-medium tracking-[-0.01em]">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[13px] opacity-70 transition-opacity duration-500 ease-smooth hover:opacity-100"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/#contact"
            className="hidden h-10 items-center rounded-full bg-paper px-5 text-[13px] font-medium text-ink transition-colors duration-500 ease-smooth hover:bg-white group-data-[tone=paper]:bg-ink group-data-[tone=paper]:text-paper group-data-[tone=paper]:hover:bg-night sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 items-center gap-3 rounded-full px-4 text-[13px] md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="relative block h-2.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-smooth",
                  open && "translate-y-[5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-smooth",
                  open && "translate-y-[-4px] -rotate-45"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <MobileMenu items={items} onNavigate={() => setOpen(false)} />
      ) : null}
    </header>
  )
}

function MobileMenu({
  items,
  onNavigate,
}: SiteHeaderProps & { onNavigate: () => void }) {
  useLockBody()

  return (
    <div
      id="mobile-menu"
      className="theme-night fixed inset-0 flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl animate-in fade-in duration-500 md:hidden"
    >
      <nav aria-label="Mobile" className="flex flex-col">
        {[...items, { title: "Contact", href: "/#contact" }].map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            data-load
            style={{ "--i": i } as React.CSSProperties}
            className="border-b border-white/10 py-4 font-heading text-4xl font-light tracking-[-0.03em]"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <a
        href={`mailto:${siteConfig.email}`}
        className="font-mono text-xs uppercase tracking-[0.2em] text-sky/70"
      >
        {siteConfig.email}
      </a>
    </div>
  )
}
