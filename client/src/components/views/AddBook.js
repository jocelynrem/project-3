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


            // const navLinks = [
            //     { name: 'Dashboard', href: 'dashboard' },
            //     { name: 'Add A Book', href: 'addbook' },
            //     { name: 'My Students', href: 'mystudents' },
            //     { name: 'Reading Log', href: 'readinglog' },
            //     { name: 'Profile', href: 'profile' },
            // ]


            const bookData = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                // ISBN: book.volumeInfo.
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));
            // const bookdata2 = [bookData];

            // // console.log("Bookdata: ", bookData);
            // console.log("Bookdata: ", bookData);
            setSearchedBooks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h2 className="flex md:mr-16 pl-5 pt-5">Two ways to add a book to {name}'s Library: </h2>
            <div className="bg-gray-200 items-center justify-center">
                <div className="flex md:flex-row flex-col items-center py-8 px-4">
                    <div className="flex flex-col md:mr-16 md:py-0 py-4">
                        <p className="text-gray-800 font-bold leading-tight tracking-normal">
                            Search by ISBN or Title
                        </p>
                        <div className="relative">
                            <div className="absolute text-gray-600 flex items-center border-r pl-1 h-full">
                                <select value={optionState} onChange={handleChange} className="myoption uppercase border-none text-sm leading-tight tracking-normal focus:outline-none h-8 appearance-none pr-6 z-20 relative bg-transparent">
                                    <option value="ISBN">isbn</option>
                                    <option value="title">title</option>
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
                        <button onClick={handleFormSubmit} className="my-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-5 py-1 text-xs">Search</button>
                    </div>
                </div>
            </div>
            <h2 className="ml-20">OR</h2>
            <div className="bg-gray-100 pl-5" id='book-form'>
                <p className="text-gray-800 font-bold text-lg leading-tight tracking-normal pt-5">
                    Manually Enter Book Information
                </p>
                <div className="items-center justify-center pb-5">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input
                                id="title"
                                required
                                className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                placeholder="Title" />
                        </div>
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input
                                id="author"
                                className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                placeholder="Author" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input
                                id="copies"
                                className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-32 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                placeholder="Copies in Library" />
                        </div>
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input
                                id="isbn"
                                className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-32 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                placeholder="ISBN" />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col w-11/12">
                        <textarea
                            id="description"
                            name="about"
                            className="bg-white border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-lt-green placeholder-gray-500 text-gray-500"
                            placeholder="A brief decription of the book"
                            rows={3}
                            defaultValue={""} />
                    </div>
                    <button className="my-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-5 py-1 text-xs">Add Book</button>
                </div>
            </div>


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
