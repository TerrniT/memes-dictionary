import { defineStore } from 'pinia'
import type { Meme } from '../types/meme'
import { MockMemeStorage } from '../lib/storage/mock'
import { SupabaseMemeStorage } from '../lib/storage/supabase'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || null
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY  || null

if(!supabaseUrl || !supabaseKey) {
  throw new Error('Meme Store: Missing Supabase credentials')
}

const storage = import.meta.env.DEV ? new MockMemeStorage() : new SupabaseMemeStorage(supabaseUrl, supabaseKey)

export const useMemeStore = defineStore('meme', {
  state: () => ({
    memes: [] as Meme[]
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
      this.memes = await storage.getMemes()
      console.log(this.memes, 'MEMES AFTER FETCH')
    },

    async addMeme(content: string) {
      const meme = await storage.addMeme({ content })
      this.memes.push(meme)
    }
  }
})