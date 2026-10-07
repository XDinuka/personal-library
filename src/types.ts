export type Status = 'read' | 'reading' | 'to-read'

export interface Book {
  id: string
  title: string
  author: string
  year?: number
  genres: string[]
  status: Status
  /** 1-5, or null if unrated */
  rating: number | null
  notes?: string
  /** Optional cover image URL */
  cover?: string
}
