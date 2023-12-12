import { bookService } from "../services/book.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
        console.log(bookId)
    }, [bookId])


    function loadBook() {
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    if (!book) return <div>Loading...</div>
    const nextBookId = bookService.getNextBook(book.id)
    console.log(nextBookId)
    return (
        <section className="book-details">

            <img className="book-image" src={book.thumbnail} />

            <p className="book-categories">Categories: {book.categories.join(", ")}</p>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-sub-title">By {book.subtitle}</p>
            <p className="book-author">By {book.authors}</p>

            <div className="book-stats">
                <p className="book-price">Price: {book.listPrice.amount}{book.listPrice.currencyCode}</p>
                <p className="book-publish-date">Published at: {book.publishedDate}</p>
                <p className="book-page-count">Pages: {book.pageCount}</p>
                <p className="book-language">Language: {book.language}</p>
                <p className="book-id">ID: {book.id}</p>
            </div>

            <button onClick={onBack}>Back</button>
            <Link to={`/book/${nextBookId}`}>Next Book</Link>
            {/* <button onClick={onNext}></button> */}
        </section>
    )
}