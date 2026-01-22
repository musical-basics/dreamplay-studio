"use client"

import React from "react"

import { useState } from "react"
import { useApps, type App } from "@/lib/app-context"
import { AppFormDialog } from "@/components/app-form-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Video,
  Link as LinkIcon,
  Users,
  Play,
  Music,
  Mic,
  Headphones,
  Radio,
  Disc,
  ExternalLink,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Link: LinkIcon,
  Users,
  Play,
  Music,
  Mic,
  Headphones,
  Radio,
  Disc,
}

// Colorful icon container styles - matching the public homepage
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

export default function AdminPage() {
  const { apps, addApp, updateApp, deleteApp } = useApps()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<App | null>(null)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState("")

  // Simple Gate
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col gap-4 w-64">
          <h2 className="text-center font-semibold text-slate-800">Admin Access</h2>
          <Input
            type="password"
            placeholder="Enter Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <Button
            onClick={() => {
              if (passcode === "sorenkier") setIsAuthenticated(true)
              else alert("Wrong code")
            }}
          >
            Enter
          </Button>
        </div>
      </div>
    )
  }

  const handleAdd = () => {
    setEditingApp(null)
    setDialogOpen(true)
  }

  const handleEdit = (app: App) => {
    setEditingApp(app)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteApp(id)
  }

  const handleSave = (appData: Omit<App, "id">) => {
    if (editingApp) {
      updateApp(editingApp.id, appData)
    } else {
      addApp(appData)
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Subtle Mesh Gradient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-indigo-100/40 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-teal-100/30 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-200/80 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-slate-800">
                <ArrowLeft className="h-4 w-4 stroke-[1.5]" />
                Back to Site
              </Button>
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <h1 className="font-semibold text-slate-800 tracking-tight">Admin</h1>
          </div>
          <Button onClick={handleAdd} size="sm" className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
            <Plus className="h-4 w-4 stroke-[1.5]" />
            Add App
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative mx-auto max-w-5xl px-8 py-10">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 tracking-tight">App Manager</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your apps. Changes will be reflected on the public site immediately.
          </p>
        </div>

        {/* Apps List */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {apps.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <p className="text-slate-500">No apps yet. Add your first app to get started.</p>
              <Button onClick={handleAdd} size="sm" className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <Plus className="h-4 w-4 stroke-[1.5]" />
                Add App
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {apps.map((app) => {
                const Icon = iconMap[app.icon] || Music
                const iconColors = iconColorMap[app.icon] || "bg-indigo-100 text-indigo-600"
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-slate-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconColors}`}>
                        <Icon className="h-5 w-5 stroke-[1.5]" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-semibold text-slate-800 tracking-tight">{app.name}</span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusStyles(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500">{app.description}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="hidden text-xs font-medium text-slate-400 uppercase tracking-wider sm:block mr-2">
                        {app.category}
                      </span>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:block"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-800">
                          <ExternalLink className="h-4 w-4 stroke-[1.5]" />
                        </Button>
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-slate-800"
                        onClick={() => handleEdit(app)}
                      >
                        <Pencil className="h-4 w-4 stroke-[1.5]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-500"
                        onClick={() => handleDelete(app.id)}
                      >
                        <Trash2 className="h-4 w-4 stroke-[1.5]" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-slate-800 tracking-tight">{apps.length}</div>
            <div className="mt-1 text-sm text-slate-500">Total Apps</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-slate-800 tracking-tight">
              {apps.filter((a) => a.status === "Live").length}
            </div>
            <div className="mt-1 text-sm text-slate-500">Live</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-slate-800 tracking-tight">
              {apps.filter((a) => a.status === "Beta").length}
            </div>
            <div className="mt-1 text-sm text-slate-500">In Beta</div>
          </div>
        </div>
      </main>

      {/* App Form Dialog */}
      <AppFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        app={editingApp}
        onSave={handleSave}
      />
    </div>
  )
}
