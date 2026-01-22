"use client"

import { useApps } from "@/lib/app-context"
import { AppCard } from "@/components/app-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function HomePage() {
  const { apps } = useApps()

  return (
    <div className="relative min-h-screen bg-white">
      {/* Mesh Gradient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-200/40 via-indigo-200/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-teal-200/30 via-cyan-200/20 to-transparent blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-200/20 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-200/80 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <span className="text-sm font-semibold text-white">D</span>
            </div>
            <span className="font-semibold text-slate-800 tracking-tight">DreamPlay Studio</span>
          </div>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-slate-800">
              <Settings className="h-4 w-4 stroke-[1.5]" />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-slate-200/80">
        <div className="mx-auto max-w-5xl px-8 py-28 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-800 md:text-5xl lg:text-6xl">
            DreamPlay Studio
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-slate-500 leading-relaxed">
            The operating system for musical creators. Everything you need to teach, connect, and grow your music business.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 text-white hover:from-indigo-600 hover:to-purple-700">
              Get Started
            </Button>
            <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <main className="relative mx-auto max-w-5xl px-8 py-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Your Apps</h2>
          <span className="text-sm text-slate-500">{apps.length} apps</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200/80 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <p className="text-center text-sm text-slate-500">
            Built for musical creators
          </p>
        </div>
      </footer>
    </div>
  )
}
