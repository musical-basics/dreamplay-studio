"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { App } from "@/lib/app-context"

const iconOptions = [
  "Video",
  "Link",
  "Users",
  "Play",
  "Music",
  "Mic",
  "Headphones",
  "Radio",
  "Disc",
]

const categoryOptions = ["Tools", "Learning", "Business"]

interface AppFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  app?: App | null
  onSave: (app: Omit<App, "id">) => void
}

export function AppFormDialog({
  open,
  onOpenChange,
  app,
  onSave,
}: AppFormDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [icon, setIcon] = useState("Music")
  const [category, setCategory] = useState("Tools")
  const [status, setStatus] = useState<App["status"]>("Live")

  useEffect(() => {
    if (app) {
      setName(app.name)
      setDescription(app.description)
      setUrl(app.url)
      setIcon(app.icon)
      setCategory(app.category)
      setStatus(app.status)
    } else {
      setName("")
      setDescription("")
      setUrl("")
      setIcon("Music")
      setCategory("Tools")
      setStatus("Live")
    }
  }, [app, open])

  const handleSave = () => {
    if (!name.trim() || !url.trim()) return

    onSave({
      name: name.trim(),
      description: description.trim(),
      url: url.trim(),
      icon,
      category,
      status,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{app ? "Edit App" : "Add New App"}</DialogTitle>
          <DialogDescription>
            {app ? "Update the app details below." : "Fill in the details to add a new app."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="App name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Icon</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as App["status"])}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Live">Live</SelectItem>
                <SelectItem value="Beta">Beta</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || !url.trim()}>
            {app ? "Save Changes" : "Add App"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
