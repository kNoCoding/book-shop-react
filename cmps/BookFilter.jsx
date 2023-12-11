const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        // The debounced function is called here, with a 500ms delay
        const timeoutId = setTimeout(() => {
            onSetFilter(filterByToEdit)
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [filterByToEdit])

    function handleChange(ev) {
        const field = ev.target.name
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
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
                <label htmlFor="txt">Book Title: </label>
                <input value={title} onChange={handleChange} type="text" id="txt" name="txt" />

                <label htmlFor="price">Price: </label>
                <input value={price || ''} onChange={handleChange} type="number" id="price" name="price" />

                <button type="submit">Filter</button>
            </form>
        </section>
    )
}
