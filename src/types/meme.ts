export interface Meme {
  id: string
  content: string
  add_date: string
  group: string
}

export interface MemeStorage {
  getMemes(): Promise<Meme[]>
  addMeme(meme: Omit<Meme, 'id' | 'add_date' | 'group'>): Promise<Meme>
}