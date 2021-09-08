/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { searchGoogleBooksbyTitle, searchGoogleBooksbyISBN } from '../utils/API.js';

const AddBookForm = () => {
    const [searchInput, setSearchInput] = useState('');
    const [optionState, setOptionState] = useState('ISBN');
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleFormSubmit = async (event) => {
        console.log('here I am')
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            let response = '';
            console.log("optionState during hadleformsubmit:", optionState)
            console.log('response before fetchign:', response)
            if (optionState === 'ISBN') {
                console.log('query from isbn')
                response = await searchGoogleBooksbyISBN(searchInput);
            }
            else {
                console.log('query by title')
                response = await searchGoogleBooksbyTitle(searchInput);
            }

            console.log('response after fetchign:', response)

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();
            console.log('items!!!!!!:', items)

            const bookData = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                // ISBN: book.volumeInfo.
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));

            setSearchedBooks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => setOptionState(event.target.value);


    return (
        <section className="relative bg-white">
            <div className="flex justify-center">
                <div className="relative bg-white shadow-xl border-2 border-dark rounded">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {/* Contact information */}
                        <div className="relative justify-center text-center overflow-hidden py-2 pl-2">

                            <h3 className="text-xl font-semibold text-gray-900 py-3">Search by Title or ISBN</h3>
                            <div className="relative">
                                <div className="absolute text-gray-600 flex items-center border-r pl-1 h-full">
                                    <select value={optionState} onChange={handleChange} className="myoption uppercase border-none text-sm leading-tight tracking-normal focus:outline-none h-8 appearance-none pr-6 z-20 relative bg-transparent">
                                        <option value="title">title</option>
                                        <option value="ISBN">isbn</option>
                                    </select>
                                    <div className="mx-1 absolute right-0 z-10">
                                        <svg className="icon icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    id="bookSearch"
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                        console.log(e.target.value)
                                    }}
                                    className="text-gray-600 focus:outline-none focus:border focus:border-lt-green font-normal w-60 h-10 flex items-center pl-20 text-sm border-gray-300 rounded border shadow" />
                            </div>
                            <div className="sm:col-span-2 sm:flex sm:justify-center">
                                <button onClick={handleFormSubmit} className="my-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-10 py-1">Search</button>
                            </div>
                        </div>

                        {/* Contact form */}
                        <div className="py-3 px-6 sm:px-10 lg:col-span-2 xl:p-12 bg-gray-100">
                            <h3 className="text-xl font-semibold text-gray-900">Manually Enter a Book</h3>
                            <form action="#" method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            required
                                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-lt-green focus:border-lt-green border-warm-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-warm-gray-900">
                                        Author
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="author"
                                            id="author"
                                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-lt-green focus:border-lt-green border-warm-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-warm-gray-900">
                                        Copies
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="copies"
                                            name="copies"
                                            type="text"
                                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-lt-green focus:border-lt-green border-warm-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <label className="block text-sm font-medium text-warm-gray-900">
                                            ISBN
                                        </label>
                                        <span className="text-sm text-warm-gray-500">
                                            Optional
                                        </span>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            name="isbn"
                                            id="isbn"
                                            type='text'
                                            autoComplete="tel"
                                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-lt-green focus:border-lt-green border-warm-gray-300 rounded-md"
                                            aria-describedby="phone-optional"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="flex justify-between">
                                        <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
                                            Description
                                        </label>
                                        <span className="text-sm text-warm-gray-500">
                                            Optional
                                        </span>
                                    </div>
                                    <div className="mt-1">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={3}
                                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-lt-green focus:border-lt-green border border-warm-gray-300 rounded-md"
                                            aria-describedby="message-max"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 sm:flex sm:justify-end">
                                    <button onClick={handleFormSubmit} className="my-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-10 py-1">Submit</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddBookForm;