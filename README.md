# Personal Library

A static site for my book collection. React + Vite + TypeScript; all data lives in [`src/data/books.json`](src/data/books.json).

```
npm install
npm run dev      # local dev server
npm run build    # static output in dist/ (relative paths, host anywhere)
```

## Adding a book

Append an object to `src/data/books.json`:

```json
{
  "id": "unique-slug",
  "title": "Title",
  "author": "Author",
  "year": 2020,
  "genres": ["Genre"],
  "status": "read",        // "read" | "reading" | "to-read"
  "rating": 4,             // 1-5 or null
  "notes": "Optional",
  "cover": "Optional image URL"
}
```
