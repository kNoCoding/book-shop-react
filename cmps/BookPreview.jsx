

export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <img className="book-image" src={book.thumbnail} />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">By {book.authors}</p>

            <p className="book-price">{book.listPrice.amount}{book.listPrice.currencyCode}</p>
            {/* <button className="book-buy-button">Buy Now!</button> */}
        </article>
    )
}