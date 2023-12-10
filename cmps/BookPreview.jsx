

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <img src={book.thumbnail} />
            <h3 className="book-title">{book.title}</h3>
            <h4>Book Speed {book.maxSpeed}</h4>
        </article>
    )
}