import { createClient } from '@supabase/supabase-js'
import type { Meme, MemeStorage } from '../../types/meme'

export class SupabaseMemeStorage implements MemeStorage {
  private supabase

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getMemes(): Promise<Meme[]> {
    const { data, error } = await this.supabase
      .from('memes')
      .select('*')
      .order('group', { ascending: true })

    if (error) throw error
    return data as Meme[]
  }

  async addMeme(meme: Omit<Meme, 'id' | 'add_date' | 'group'>): Promise<Meme> {
    const group = meme.content.charAt(0).toUpperCase()
    const newMeme = {
      content: meme.content,
      group,
      add_date: new Date().toISOString()
    }

    const { data, error } = await this.supabase
      .from('memes')
      .insert([newMeme])
      .select()
      .single()

    if (error) throw error
    return data as Meme
  }
}