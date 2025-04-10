import { defineStore } from 'pinia'
import { db } from '../lib/db'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async initialize() {
      try {
        this.loading = true
        const { data: { user } } = await db.auth.getUser()
        this.user = user
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }

      db.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user ?? null
      })
    },

    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
        const { error } = await db.auth.signInWithPassword({ email, password })
        if (error) throw error
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async register(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
        const { error } = await db.auth.signUp({ email, password })
        if (error) throw error
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        this.loading = true
        this.error = null
        const { error } = await db.auth.signOut()
        if (error) throw error
      } catch (error: any) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})