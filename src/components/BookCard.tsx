import type { Book, Status } from '../types'

export const STATUS_LABEL: Record<Status, string> = {
  read: 'Read',
  reading: 'Reading',
  'to-read': 'To read',
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="card">
      <div className="cover">
        {book.cover ? (
          <img src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" />
        ) : (
          <span>{book.title.slice(0, 1)}</span>
        )}
      </div>
      <div className="info">
        <h2>{book.title}</h2>
        <p className="author">
          {book.author}
          {book.year ? ` · ${book.year}` : ''}
        </p>
        <div className="tags">
          <span className={`badge ${book.status}`}>{STATUS_LABEL[book.status]}</span>
          {book.genres.map((g) => (
            <span key={g} className="badge genre">
              {g}
            </span>
          ))}
        </div>
        {book.rating != null && (
          <p className="rating" aria-label={`${book.rating} out of 5`}>
            {'★'.repeat(book.rating)}
            {'☆'.repeat(5 - book.rating)}
          </p>
        )}
        {book.notes && <p className="notes">{book.notes}</p>}
      </div>
    </article>
  )
}
