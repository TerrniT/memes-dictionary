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

  async addMeme(meme: Omit<Meme, 'id' | 'addDate' | 'group'>): Promise<Meme> {
    const group = meme.content.charAt(0).toUpperCase()
    const newMeme = {
      content: meme.content,
      group,
      addDate: new Date().toISOString()
    }

    const { data, error } = await this.supabase
      .from('memes')
      .insert([newMeme])
      .select()
      .single()

      console.log(data, error, 'HELLO ADD NEW MEME')

    if (error) throw error
    return data as Meme
  }
}