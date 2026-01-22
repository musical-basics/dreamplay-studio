"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface App {
  id: string
  name: string
  description: string
  url: string
  icon: string
  category: string
  status: "Live" | "Beta" | "Free"
}

const initialApps: App[] = [
  {
    id: "1",
    name: "DreamPlay Vision",
    description: "AI Hand Analysis",
    url: "https://vision.dreamplay.studio",
    icon: "Video",
    category: "Tools",
    status: "Beta",
  },
  {
    id: "2",
    name: "DreamLink",
    description: "Link-in-bio for musicians",
    url: "https://link.dreamplay.studio",
    icon: "Link",
    category: "Tools",
    status: "Free",
  },
  {
    id: "3",
    name: "Piano CRM",
    description: "Student management system",
    url: "https://crm.dreamplay.studio",
    icon: "Users",
    category: "Business",
    status: "Live",
  },
  {
    id: "4",
    name: "Masterclass",
    description: "Video lesson platform",
    url: "https://masterclass.dreamplay.studio",
    icon: "Play",
    category: "Learning",
    status: "Live",
  },
]

interface AppContextType {
  apps: App[]
  addApp: (app: Omit<App, "id">) => void
  updateApp: (id: string, app: Omit<App, "id">) => void
  deleteApp: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<App[]>(initialApps)

  const addApp = (app: Omit<App, "id">) => {
    const newApp: App = {
      ...app,
      id: Date.now().toString(),
    }
    setApps((prev) => [...prev, newApp])
  }

  const updateApp = (id: string, updatedApp: Omit<App, "id">) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...updatedApp, id } : app))
    )
  }

  const deleteApp = (id: string) => {
    setApps((prev) => prev.filter((app) => app.id !== id))
  }

  return (
    <AppContext.Provider value={{ apps, addApp, updateApp, deleteApp }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApps() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApps must be used within an AppProvider")
  }
  return context
}
