"use client"

import React from "react"

import { ExternalLink, Video, Link, Users, Play, Music, Mic, Headphones, Radio, Disc } from "lucide-react"
import type { App } from "@/lib/app-context"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Link,
  Users,
  Play,
  Music,
  Mic,
  Headphones,
  Radio,
  Disc,
}

// Colorful icon container styles - each icon gets a unique color
const iconColorMap: Record<string, string> = {
  Video: "bg-violet-100 text-violet-600",
  Link: "bg-sky-100 text-sky-600",
  Users: "bg-teal-100 text-teal-600",
  Play: "bg-rose-100 text-rose-600",
  Music: "bg-indigo-100 text-indigo-600",
  Mic: "bg-amber-100 text-amber-600",
  Headphones: "bg-fuchsia-100 text-fuchsia-600",
  Radio: "bg-emerald-100 text-emerald-600",
  Disc: "bg-purple-100 text-purple-600",
}

function getStatusStyles(status: App["status"]) {
  switch (status) {
    case "Live":
      return "bg-emerald-100 text-emerald-700"
    case "Beta":
      return "bg-violet-100 text-violet-700"
    case "Free":
      return "bg-sky-100 text-sky-700"
    default:
      return "bg-slate-100 text-slate-600"
  }
}

export function AppCard({ app }: { app: App }) {
  const Icon = iconMap[app.icon] || Music
  const iconColors = iconColorMap[app.icon] || "bg-indigo-100 text-indigo-600"

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconColors}`}>
          <Icon className="h-5 w-5 stroke-[1.5]" />
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(app.status)}`}>
          {app.status}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="flex items-center gap-2 font-semibold text-slate-800 tracking-tight">
          {app.name}
          <ExternalLink className="h-3.5 w-3.5 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 stroke-[1.5]" />
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">{app.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{app.category}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100">
          Launch
          <ExternalLink className="h-3 w-3 stroke-[2]" />
        </span>
      </div>
    </a>
  )
}
