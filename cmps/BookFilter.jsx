const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, title: filterBy.title || '', price: filterBy.price || '' })


    useEffect(() => {
        // The debounced function is called here, with a 500ms delay
        const timeoutId = setTimeout(() => {
            onSetFilter(filterByToEdit)
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSetFilterBy(ev) {
        ev.preventDefault();
        onSetFilter(filterByToEdit);
    }

    const { title, price } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSetFilterBy}>
                <label htmlFor="title">Book Title: </label>
                <input value={title} onChange={handleChange} type="text" id="title" name="title" />

                <label htmlFor="price">Price: </label>
                <input value={price || ''} onChange={handleChange} type="number" id="price" name="price" />

                <button type="submit">Filter</button>
            </form>
        </section>
    )
}
