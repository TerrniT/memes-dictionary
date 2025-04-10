import type { Meme, MemeStorage } from '../../types/meme'

export class MockMemeStorage implements MemeStorage {
  private memes: Meme[] = []

  async getMemes(): Promise<Meme[]> {
    return this.memes
  }

  async addMeme(meme: Omit<Meme, 'id' | 'add_date' | 'group'>): Promise<Meme> {
    const newMeme: Meme = {
      id: crypto.randomUUID(),
      content: meme.content,
      add_date: new Date().toISOString(),
      group: meme.content.charAt(0).toUpperCase()
    }
    
    this.memes.push(newMeme)
    return newMeme
  }
}