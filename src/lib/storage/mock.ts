import type { Meme, MemeStorage } from '../../types/meme'

export class MockMemeStorage implements MemeStorage {
  private memes: Meme[] = []

  async getMemes(): Promise<Meme[]> {
    return this.memes
  }

  async addMeme(meme: Omit<Meme, 'id' | 'addDate' | 'group'>): Promise<Meme> {
    const newMeme: Meme = {
      id: crypto.randomUUID(),
      content: meme.content,
      addDate: new Date().toISOString(),
      group: meme.content.charAt(0).toUpperCase()
    }
    
    this.memes.push(newMeme)
    return newMeme
  }
}