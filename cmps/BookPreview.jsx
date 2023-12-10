

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Vendor: {book.vendor}</h2>
            <h4>Book Speed {book.maxSpeed}</h4>
            <img src={`../assets/img/${book.vendor}.png`} alt="" />
        </article>
    )
}