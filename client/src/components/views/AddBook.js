import { searchGoogleBooksbyTitle, searchGoogleBooksbyISBN } from '../../utils/API.js';
import { useState } from 'react';
import SearchResults from '../SearchResults.js';

export default function AddBook({ name }) {


    const [searchInput, setSearchInput] = useState('');
    // const [searchResults, setSearchResults] = useState('');
    const [optionState, setOptionState] = useState('ISBN');
    const [searchedBooks, setSearchedBooks] = useState([]);
    console.log('optionState:', optionState)
    const handleChange = (event) => setOptionState(event.target.value);

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
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));

            setSearchedBooks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h2 className="flex md:mr-16 pt-5">Two ways to add a book to {name}'s Library: </h2>
            <section className="relative bg-white" id="book-form">
                <div className="my-2 justify-center">
                    <div className="relative bg-white shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {/* Google API Search */}
                            <div className="relative overflow-hidden m-2">

                                <h3 className="text-xl font-semibold text-gray-900 pt-1 pb-2">1. Search by Title or ISBN</h3>
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
                                        type='text'
                                        name='searchInput'
                                        value={searchInput}
                                        onChange={(e) => {
                                            setSearchInput(e.target.value);
                                            console.log(e.target.value)
                                        }}
                                        className="py-3 px-4 pl-20 w-full shadow-sm text-gray-900 focus:ring-lt-green focus:border-lt-green border-gray-300 rounded-md" />
                                </div>
                                <div className="sm:col-span-2 mt-2 sm:flex sm:justify-end">
                                    <button onClick={handleFormSubmit} className="my-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-10 py-2">Search</button>
                                </div>
                            </div>

                            {/* Manual Inputs */}
                            <div className="py-3 px-6 sm:px-10 lg:col-span-2 xl:p-12 bg-gray-100">
                                <h3 className="text-xl font-semibold text-gray-900">2. Manually Enter a Book</h3>
                                <form action="#" method="POST" className="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-6 sm:gap-x-8">
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Title
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                required
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lt-green focus:border-lt-green border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Author
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="author"
                                                id="author"
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lt-green focus:border-lt-green border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <div className="flex justify-between">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                                                Description
                                            </label>
                                            <span className="text-sm text-gray-400">
                                                Optional
                                            </span>
                                        </div>
                                        <div className="mt-1">
                                            <textarea
                                                id="message"
                                                name="description"
                                                rows={2}
                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-lt-green focus:border-lt-green border border-gray-300 rounded-md"
                                                aria-describedby="message-max"
                                                defaultValue={''}
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="block text-sm font-medium text-gray-900">
                                            Copies
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="copies"
                                                name="copies"
                                                type="text"
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lt-green focus:border-lt-green border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="flex justify-between">
                                            <label className="block text-sm font-medium text-gray-900">
                                                ISBN
                                            </label>
                                            <span className="text-sm text-gray-400">
                                                Optional
                                            </span>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                name="isbn"
                                                id="isbn"
                                                type='text'
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lt-green focus:border-lt-green border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6 sm:flex sm:justify-end">
                                        <button onClick={handleFormSubmit} className="mb-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-10 py-1">Submit</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {console.log(searchedBooks)}

            <div className="rounded-lg bg-dark overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-1">
                {searchedBooks.map((item) => (
                    <SearchResults
                        key={item.bookId}
                        title={item.title}
                        author={item.authors}
                        image={item.image}
                        descpiption={item.description}
                    />
                ))}
            </div>
        </>
    )
}
