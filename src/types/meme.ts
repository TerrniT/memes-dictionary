export interface Meme {
  id: string
  content: string
  addDate: string
  group: string
}

export interface MemeStorage {
  getMemes(): Promise<Meme[]>
  addMeme(meme: Omit<Meme, 'id' | 'addDate' | 'group'>): Promise<Meme>
}