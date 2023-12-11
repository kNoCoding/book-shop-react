import { bookService } from "../services/book.service.js"
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.bookId) {
            loadBook();
        }
    }, [params.bookId]);  // Ensure useEffect runs when bookId changes

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => {
                if (!book.listPrice) {  // Handle cases where listPrice might be missing
                    book.listPrice = { amount: 0 };
                }
                setBookToEdit(book);
            })
            .catch(err => console.log('err:', err));
    }

    function handleChange({ target }) {
        const field = target.name;
        let value = target.type === 'number' ? +target.value : target.value;

        if (field === 'price') {
            // Update the nested price value
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: { ...prevBook.listPrice, amount: value }
            }));
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }));
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault();
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => console.log('err:', err));
    }

    const { title, listPrice: { amount: price } } = bookToEdit;

    return (
        <section className="book-edit">
            <h1>Add Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />
                <button disabled={!title}>Save</button>
            </form>
        </section>
    );
}