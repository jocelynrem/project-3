/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { HiSave } from "react-icons/hi";

const SearchResults = ({ resultId, image, title, author, description, handleAddBook }) => {

    const [show, setShow] = useState(null);
    return (
        <>
            <ul className='sm:rounded-tr-lg sm:rounded-bl-lg relative bg-white p-4 m-2' key={resultId}>
                <div className="bg-blue-900 text-white inline-flex w-full items-center py-1 justify-end mb-4">
                    <p className="flex text-sm font-medium">
                        Add
                    </p>
                    <input
                        id="copies"
                        name="copies"
                        maxLength='3'
                        size='4'
                        className="shadow-sm mx-1 focus:ring-lime-600 focus:border-lime-600 border-lime-300 rounded-md"
                    />
                    <p className="flex text-sm font-medium">
                        copies to my library
                    </p>
                    <span
                        onClick={() => handleAddBook(resultId)}
                        className="text-lime-500 hover:text-lime-400 cursor-pointer pr-3"
                        aria-hidden="true">
                        <HiSave className="h-8 w-8 ml-1" />
                    </span>
                </div>
                <div className='rounded-lg px-5'>
                    <img src={image} alt='book cover' className="h-18 float-left pr-4" aria-hidden="true" />
                    <div className="mt-2">
                        <h3 className="text-lg font-bold">
                            {title}
                        </h3>
                        <h3>Author:{author}</h3>
                        <div className="">
                            <div className="flex items-center">
                                <div className="cursor-pointer">
                                    {show == 0 ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(null)} aria-label="Show" className="icon icon-tabler icon-tabler-chevron-down" width={22} height={22} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(0)} aria-label="Hide" className=" icon icon-tabler icon-tabler-chevron-up" width={22} height={22} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <polyline points="6 15 12 9 18 15" />
                                        </svg>
                                    )}
                                </div>
                                <h1 className="text-lg text-gray-700 font-semibold">Description</h1>
                            </div>
                            {show == 0 && (
                                <p className="mt-2 text-sm text-gray-600">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default SearchResults;