import { defineStore } from 'pinia'
import type { Meme } from '../types/meme'
import { MockMemeStorage } from '../lib/storage/mock'
import { SupabaseMemeStorage } from '../lib/storage/supabase'


const storage = import.meta.env.DEV ? new MockMemeStorage() : new SupabaseMemeStorage()

export const useMemeStore = defineStore('meme', {
  state: () => ({
    memes: [] as Meme[],
    loading: false
  }),
  
  getters: {
    groupedMemes: (state) => {
      const groups = new Map<string, Meme[]>()
      state.memes.forEach(meme => {
        const group = meme.group
        if (!groups.has(group)) {
          groups.set(group, [])
        }
        groups.get(group)?.push(meme)
      })
      return new Map([...groups.entries()].sort())
    }
  },

  actions: {
    async fetchMemes() {
      try {
        this.loading = true
        this.memes = await storage.getMemes()
      } catch (error) {
        console.error('Error fetching memes:', error)
      } finally {
        this.loading = false
      }
    },

    async addMeme(content: string) {
      try {
        this.loading = true
        const meme = await storage.addMeme({ content })
        this.memes.push(meme)
      } catch (error) {
        console.error('Error adding meme:', error)
      } finally {
        this.loading = false
      }
    }
  }
})