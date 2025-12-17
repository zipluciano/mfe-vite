import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
}

export interface Notification {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: number
}

export interface GlobalState {
  // User state
  user: User | null
  setUser: (user: User | null) => void

  // Theme state
  theme: 'light' | 'dark'
  toggleTheme: () => void

  // Counter state (demo purposes)
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void

  // Notifications
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void

  // Loading state
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useGlobalStore = create<GlobalState>()(
  devtools(
    (set) => ({
      // User
      user: null,
      setUser: (user) => set({ user }, false, 'setUser'),

      // Theme
      theme: 'light',
      toggleTheme: () =>
        set(
          (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
          false,
          'toggleTheme'
        ),

      // Counter
      count: 0,
      increment: () =>
        set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () =>
        set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),

      // Notifications
      notifications: [],
      addNotification: (notification) =>
        set(
          (state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: crypto.randomUUID(),
                timestamp: Date.now(),
              },
            ],
          }),
          false,
          'addNotification'
        ),
      removeNotification: (id) =>
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          'removeNotification'
        ),
      clearNotifications: () =>
        set({ notifications: [] }, false, 'clearNotifications'),

      // Loading
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
    }),
    { name: 'GlobalStore' }
  )
)
