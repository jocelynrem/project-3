/* eslint-disable eqeqeq */
import React, { useState } from "react";

const SearchResults = props => {
// const SearchResults = ({ key, title, author, image, description, handleAddBook }) => {


    const [show, setShow] = useState(null);
    const [tooltipStatus, setTooltipStatus] = useState(0);

    // {console.log("WHAT IS THIS PROPS>KEY: ", props.resultId)}

    return (
        <>
            <ul
                className='sm:rounded-tr-lg sm:rounded-bl-lg relative bg-white p-6 m-2'>
                <div key={props.resultId}>
                    <span className='rounded-lg p-3'>
                        <img src={props.image} alt='book cover' className="h-18 float-left pr-4" aria-hidden="true" />
                        <div className="mt-2">
                            <h3 className="text-lg font-bold">
                                {props.title}
                            </h3>
                            <h3>Author:{props.author}</h3>
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
                                        {props.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </span>
                </div>
                {/* ADD BOOK ARROW STARTS HERE */}
                <div  className="flex-col absolute top-6 right-6 float-right md:flex-row flex items-center md:justify-center">
                    <div className="mt-0 md:mt-0 m-5" onMouseEnter={() => setTooltipStatus(1)} onMouseLeave={() => setTooltipStatus(0)}>
                        {tooltipStatus == 1 && (
                            <div role="tooltip" className="z-20 transition duration-150 ease-in-out top-0 right-10 mb-8 absolute shadow-lg p-2 bg-dark text-white rounded w-40">
                                <svg className="absolute bottom-0 -mb-2" width="10px" height="8px" viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                </svg>
                                <p className="text-xs text-white leading-4">Add this book to your library.</p>
                            </div>
                        )}
                        <a href='#book-form' className="focus:outline-none" onClick={() => props.handleAddBook(props.resultId)}>
                            <span
                                className="text-md-green hover:text-dark cursor-pointer"
                                aria-hidden="true">
                                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default SearchResults;

