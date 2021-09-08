import { searchGoogleBooksbyTitle, searchGoogleBooksbyISBN } from '../../utils/API.js';
import { useState, useMutation, useEffect } from 'react';
import { ADD_BOOK } from '../../utils/mutations.js';
import { saveBookIds, getSavedBookIds } from '../../utils/localStorage.js';

export default function AddBook({ name }) {
    const teacherId1 = localStorage.getItem('teacher_id');
    // console.log('this is the teachers Id from DashContainer:', teacherId);


    const [searchInput, setSearchInput] = useState('');
    // const [searchResults, setSearchResults] = useState('');
    const [optionState, setOptionState] = useState('ISBN');
    const [searchedBooks, setSearchedBooks] = useState([]);
      // create state to hold saved bookId values
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

//    try{
    const [addBook, { error }] = useMutation(ADD_BOOK);
//     } catch (err) {
//     console.error(err);
//   }
    useEffect(() => {
        return () => saveBookIds(savedBookIds);
      });
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
            
            
            
            
            const bookInfo = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                // ISBN: book.volumeInfo.
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));
            
            
            setSearchedBooks(bookInfo);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    
        const handleSaveBook = async (bookId) => {
            // find the book in `searchedBooks` state by the matching id
            const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
        
        
            try {
              const { data } = await addBook({
                variables: //{teacherId: {teacherId1},  bookInfo: { ...bookToSave } },
                    {teacherId1, ...bookToSave},
              });
              console.log(savedBookIds);
              setSavedBookIds([...savedBookIds, bookToSave.bookId]);
            } catch (err) {
              console.error(err);
            }
          };
    
    
    return (
        <>
            <h2 className="flex md:mr-16 pl-5 pt-5">Two ways to add a book to {name.toUpperCase()}'s Library: </h2>
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
                                className="text-gray-600 focus:outline-none focus:border focus:border-lt-green font-normal w-80 h-10 flex items-center pl-20 text-sm border-gray-300 rounded border shadow" />
                        </div>
                        <button onClick={handleFormSubmit}>click me to Search</button>
                    </div>
                </div>
            </div>
            <h2 className="ml-20">OR</h2>
            <div className="bg-gray-100 pl-5">
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
            <div>
                <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                    <thead>

                        <tr className="border-b border-gray-300 dark:border-gray-700">
                            <th className="py-5 sm:pl-10 pl-2 w-1/4 text-base text-gray-800 dark:text-gray-100">Title</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100">Author</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Description</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">ISBN</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Save Book?</th>
                        </tr>
                    </thead>
                    <tbody >
                    {console.log(searchedBooks)}
                    {searchedBooks.map((item) => (
                        <tr key={item.bookId}>
                            <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{item.title}</td>
                            <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{item.authors}</td>
                            <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">{item.description}</td>
                            <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right"><img src = {item.image}/></td>
                            <td><input type="checkbox" onClick={() => handleSaveBook(item.bookId)} className="checkbox opacity-0 absolute cursor-pointer w-full h-full" /></td>
                            
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

//  <Button
// disabled={savedBookIds?.some(
//   (savedId) => savedId === book.bookId
// )}
// className="btn-block btn-info"
// onClick={() => handleSaveBook(book.bookId)}
// >
// {savedBookIds?.some((savedId) => savedId === book.bookId)
//   ? 'Book Already Saved!'
//   : 'Save This Book!'}
// </Button> 

// disabled={savedBookIds?.some(
//     (savedId) => savedId === book.bookId
// )}
// className="btn-block btn-info"
// onClick={() => handleSaveBook(book.bookId)}
// {savedBookIds?.some((savedId) => savedId === book.bookId)
//     ? 'Book Already Saved!'
//     : 'Save This Book!'}