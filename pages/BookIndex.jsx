const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
        return () => {
            // alert('Bye Bye')
        }
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                // const newBooks = books.filter(book => book.id !== bookId)
                // setBooks(newBooks)
                setBooks(prevBooks => {
                    return prevBooks.filter(book => book.id !== bookId)
                })
                showSuccessMsg(`Book successfully removed! ${bookId}`)
            })
            .catch(err => console.log('err:', err))

    }


    function onSetFilter(filterBy) {
        // setFilterBy(filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    const { title, price } = filterBy
    const Button = ({ onClick, children, as: Component = 'button', ...rest }) => {
        return (
            <Component onClick={onClick} className="button" {...rest}>
                {children}
            </Component>
        );
    };

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index ">
            <h1>Welcome to book index!</h1>
            <BookFilter filterBy={{ title, price }} onSetFilter={onSetFilter} />
            <Link to="/book/edit" className="add-new-book-button" >Add New Book</Link>
            {/* <Button as={Link} to="/book/edit" className="add-new-book-button">Add New Book</Button> */}
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}