import { gql, useMutation } from '@apollo/client';
import { searchGoogleBooksbyTitle, searchGoogleBooksbyISBN } from '../../utils/API.js';
import { useState, useEffect } from 'react';
import SearchResults from '../SearchResults.js';
// import { useMutation } from '@apollo/client';
import { ADD_BOOK } from "../../utils/mutations";
import {getSavedBookIds, saveBookIds} from '../../utils/localStorage'


export default function AddBook({ name }) {

    const teacherId = localStorage.getItem('teacher_id');
    const [searchInput, setSearchInput] = useState('');
    // const [searchResults, setSearchResults] = useState('');
    const [optionState, setOptionState] = useState('ISBN');
    const [searchedBooks, setSearchedBooks] = useState([])

    console.log('optionState:', optionState)
    // console.log("current formstate: ", formState )
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

    const [addBook, { error, bookInfo }] = useMutation(ADD_BOOK);
    //     const [addBook, { error, data}] = useMutation(ADD_BOOK)
    // console.log('data from AddBooks:', data);


    useEffect(() => {
        return () => saveBookIds(savedBookIds);
    });

    console.log("savedBookIds: ", savedBookIds);


    const handleChange = (event) => setOptionState(event.target.value);

    const [formState, setFormState] = useState({
        title: '',
        authors: '',
        ISBN: '',
        description: '',
        copiesAvailable: '',
    });
    const handleChange2 = (event) => {
        const { name, value } = event.target;
        // console.log('name:', name);
        // console.log('value:', value);
        setFormState({
            ...formState,
            [name]: value,
        });

    };
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
            // setSavedBookIds(bookData.bookId)
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };


    const handleFormSubmit2 = async (event) => {
        event.preventDefault();

        try {
            console.log("before Mutation: ", formState);

            const { info } = await addBook({
                variables: {
                    teacherId,
                    bookInfo: { 
                        title: formState.title,
                        authors: formState.authors,
                        description: formState.description,
                        ISBN: formState.ISBN,
                        copiesAvailable: parseInt(formState.copiesAvailable)
                    }
                },
            });
            // console.log("AFTER");
            console.log("data from add book: ", formState);
            console.log("bookinfo submission:", info)

            setFormState({
                title: '',
                authors: '',
                ISBN: '',
                description: '',
                copiesAvailable: '',
            })
        } catch (error) {
            console.error(error);
        }

    }


    const handleAddBook = async (bookId) => {
        console.log('HANDLE Add BOok, bookId', bookId);
        const bookToSave = searchedBooks.find((book) => book.bookId === bookId)
        console.log('HANDLE Add BOok, bookToSave', bookToSave);
        try {
            const { data } = await addBook({
                variables: {
                    teacherId,
                    bookInfo: {
                        title: bookToSave.title,
                        authors: bookToSave.authors,
                        description: bookToSave.description,
                        bookId: bookToSave.bookId
                    }
                }
            })
            console.log("handleAddBook data: ", data)
            console.log("handleAddBook teacherID: ", teacherId)
            console.log("handleAddBook bookToSave", bookToSave)

            if (!bookToSave) {
                throw new Error('Something went wrong addding your book!');
            }

            setSavedBookIds([...savedBookIds, bookToSave.bookId])
            console.log("setSavedBookIds savedBookIds", savedBookIds)
            console.log("handleAddBook bookToSave", bookToSave)
            console.log("handleAddBook bookToSave", bookToSave)
        } catch (err) {
            console.error(err);
        }


    }


    return (
        <>
            <h1 className="md:mr-16 pt-3 text-center text-blue-900 font-bold w-full uppercase tracking-wider">Two ways to add books to {name}'s Library: </h1>
            <section className="relative bg-white" id="book-form">
                <div className="">
                    <div className="relative bg-white shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {/* Google API Search */}
                            <div className="relative overflow-hidden bg-gradient-to-t from-blue-900 via-blue-800 to-blue-900">

                                <h3 className="text-xl mx-2 text-gray-100 pt-2 lg:pt-16 pb-2">1. Search by Title or ISBN</h3>
                                <div className="relative m-2">
                                    <div className="absolute text-gray-600 flex items-center border-r pl-1 h-full">
                                        <select value={optionState} onChange={handleChange} className="myoption uppercase border-none text-sm leading-tight tracking-normal focus:outline-none h-8 appearance-none pr-6 z-20 relative bg-transparent">
                                            <option value="title">title</option>
                                            <option value="ISBN">isbn</option>
                                        </select>
                                        <div className="mx-1 absolute right-0">
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
                                        className="py-3 px-4 pl-20 w-full shadow-sm text-gray-900 focus:ring-lime-600 focus:border-lime-600 border-gray-300 rounded-md" />
                                </div>
                                <div className="sm:col-span-2 mt-2 sm:flex sm:justify-end m-2">
                                    <button onKeyPress={handleFormSubmit} onClick={handleFormSubmit} className="my-2 bg-lime-700 transition duration-150 ease-in-out hover:bg-lime-600 rounded text-white px-10 py-2">Search</button>
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
                                                value={formState.title}
                                                onChange={handleChange2}
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lime-600 focus:border-lime-600 border-gray-300 rounded-md"
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
                                                name="authors"
                                                id="authors"
                                                value={formState.authors}
                                                onChange={handleChange2}
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lime-600 focus:border-lime-600 border-gray-300 rounded-md"
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
                                                value={formState.description}
                                                onChange={handleChange2}
                                                name="description"
                                                rows={2}
                                                className="pt-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-lime-600 focus:border-lime-600 border border-gray-300 rounded-md"
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
                                                name="copiesAvailable"
                                                type="text"
                                                value={formState.copiesAvailable}
                                                onChange={handleChange2}
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lime-600 focus:border-lime-600 border-gray-300 rounded-md"
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
                                                name="ISBN"
                                                id="isbn"
                                                type='text'
                                                value={formState.isbn}
                                                onChange={handleChange2}
                                                className="px-4 block w-full shadow-sm text-gray-900 focus:ring-lime-600 focus:border-lime-600 border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-6 sm:flex sm:justify-end">
                                        <button onClick={handleFormSubmit2} className="mb-2 bg-blue-900 transition duration-150 ease-in-out hover:bg-blue-700 rounded text-white px-10 py-2">Submit</button>


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div id='search-results' className="bg-blue-900 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-1">
                {console.log('searchedBooks:', searchedBooks)}
                {searchedBooks.map((item) => (
                    <SearchResults
                        key={item.bookId}
                        resultId={item.bookId}
                        title={item.title}
                        author={item.authors}
                        image={item.image}
                        description={item.description}
                        handleAddBook={handleAddBook}
                    />
                ))}
            </div>
        </>
    )
    // } in case
}

//                {console.log("SearchBooks: ", searchedBooks)}
// {console.log("SearchBooks 0: ", searchedBooks[0].bookId)}
