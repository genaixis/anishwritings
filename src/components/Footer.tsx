import { book, publisher } from '../data/book'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        © {year} {publisher.displayName}. <span lang="te">{book.titleTelugu}</span> — ISBN{' '}
        {book.isbn}
      </p>
      <p className="site-footer__note">Crafted with care for readers across India.</p>
    </footer>
  )
}