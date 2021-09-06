import { searchGoogleBooksbyTitle, searchGoogleBooksbyISBN } from '../../utils/API.js';
import { useState } from 'react';


export default function AddBook({ name }) {


    const [searchInput, setSearchInput] = useState('');
    const [optionState, setOptionState] = useState('ISBN');
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
            if(optionState === 'ISBN') 
                 response = await searchGoogleBooksbyISBN(searchInput);
            else 
                response = await searchGoogleBooksbyTitle(searchInput);

    
          if (!response.ok) {
            throw new Error('something went wrong!');
          }
    
          const { items } = await response.json();
          console.log('items!!!!!!:', items)
    
        //   const bookData = items.map((book) => ({
        //     bookId: book.id,
        //     authors: book.volumeInfo.authors || ['No author to display'],
        //     title: book.volumeInfo.title,
        //     description: book.volumeInfo.description,
        //     image: book.volumeInfo.imageLinks?.thumbnail || '',
        //   }));
    
        //   setSearchedBooks(bookData);
          setSearchInput('');
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
                                    <option value="isbn">isbn</option>
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
                                value = {searchInput} 
                                onChange={(e) => 
                                    {
                                    setSearchInput(e.target.value);
                                    console.log( e.target.value )
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
                            <input id="title" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Title" />
                        </div>
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input id="author" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Author" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input id="lexile" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green  bg-white font-normal w-32 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Lexile" />
                        </div>
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input id="copies" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-32 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Copies in Library" />
                        </div>
                        <div className="flex flex-col mt-4 md:mr-16">
                            <input id="isbn" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-32 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="ISBN" />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col w-11/12">
                        <textarea id="description" name="about" required className="bg-white border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-lt-green placeholder-gray-500 text-gray-500" placeholder="A brief decription of the book" rows={3} defaultValue={""} />
                    </div>
                </div>
            </div>
        </>
    )
}
