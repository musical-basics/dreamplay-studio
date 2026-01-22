"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export interface App {
  id: string
  name: string
  description: string
  url: string
  icon: string
  category: string
  status: "Live" | "Beta" | "Free"
}

interface AppContextType {
  apps: App[]
  isLoading: boolean
  addApp: (app: Omit<App, "id">) => Promise<void>
  updateApp: (id: string, app: Omit<App, "id">) => Promise<void>
  deleteApp: (id: string) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<App[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 1. Fetch Apps on Load
  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
    const { data, error } = await supabase.from('apps').select('*').order('created_at', { ascending: true })
    if (!error && data) setApps(data as App[])
    setIsLoading(false)
  }

  // 2. Add App
  const addApp = async (appData: Omit<App, "id">) => {
    // Optimistic UI update (show it immediately before DB confirms)
    const tempId = Math.random().toString()
    setApps(prev => [...prev, { ...appData, id: tempId }])

    const { data, error } = await supabase.from('apps').insert([appData]).select()

    if (data) {
      // Replace temp ID with real ID
      setApps(prev => prev.map(a => a.id === tempId ? data[0] : a))
    } else {
      // Revert if error
      console.error(error)
      fetchApps()
    }
  }

  // 3. Update App
  const updateApp = async (id: string, appData: Omit<App, "id">) => {
    setApps(prev => prev.map(a => a.id === id ? { ...appData, id } : a)) // Optimistic
    await supabase.from('apps').update(appData).eq('id', id)
  }

  // 4. Delete App
  const deleteApp = async (id: string) => {
    setApps(prev => prev.filter(a => a.id !== id)) // Optimistic
    await supabase.from('apps').delete().eq('id', id)
  }

  return (
    <AppContext.Provider value={{ apps, isLoading, addApp, updateApp, deleteApp }}>
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
