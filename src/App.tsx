import { useMemo, useState } from 'react'
import rawBooks from './data/books.json'
import type { Book, Status } from './types'
import BookCard, { STATUS_LABEL } from './components/BookCard'

const books = rawBooks as Book[]
const genres = [...new Set(books.flatMap((b) => b.genres))].sort()

type SortKey = 'title' | 'author' | 'year' | 'rating'

const sorters: Record<SortKey, (a: Book, b: Book) => number> = {
  title: (a, b) => a.title.localeCompare(b.title),
  author: (a, b) => a.author.localeCompare(b.author),
  year: (a, b) => (b.year ?? 0) - (a.year ?? 0),
  rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
}

export default function App() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status | 'all'>('all')
  const [genre, setGenre] = useState('all')
  const [sort, setSort] = useState<SortKey>('title')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return books
      .filter((b) => status === 'all' || b.status === status)
      .filter((b) => genre === 'all' || b.genres.includes(genre))
      .filter(
        (b) =>
          !q ||
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genres.some((g) => g.toLowerCase().includes(q)),
      )
      .sort(sorters[sort])
  }, [query, status, genre, sort])

  return (
    <main>
      <header>
        <h1>My Library</h1>
        <p className="count">
          {visible.length} of {books.length} books
        </p>
      </header>

      <div className="controls">
        <input
          type="search"
          placeholder="Search title, author, genre…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value as Status | 'all')}>
          <option value="all">All statuses</option>
          {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All genres</option>
          {genres.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          <option value="title">Sort: Title</option>
          <option value="author">Sort: Author</option>
          <option value="year">Sort: Year (newest)</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {visible.length ? (
        <section className="grid">
          {visible.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </section>
      ) : (
        <p className="empty">No books match.</p>
      )}
    </main>
  )
}
