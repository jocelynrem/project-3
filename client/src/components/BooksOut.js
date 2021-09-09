/* eslint-disable eqeqeq */
import React, { useState } from "react";


const BooksOut = () => {
    const [show, setShow] = useState(null);
    return (
        <>
            <div className="mx-auto container py-12 px-6">
                <div className="">
                    <div className="flex pt-6 items-center">
                        <div className="cursor-pointer">
                            {show == 0 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(null)} aria-label="Show" className="icon icon-tabler icon-tabler-chevron-down" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(0)} aria-label="Hide" className=" icon icon-tabler icon-tabler-chevron-up" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="6 15 12 9 18 15" />
                                </svg>
                            )}
                        </div>

                        <h1 className="text-lg text-gray-900 font-semibold ml-3">Books Borrowed</h1>
                    </div>
                    {show == 0 && (
                        <table className="w-full shadow text-left bg-white">
                            <thead>
                                <tr className="border-b border-gray-300 dark:border-gray-700">
                                    <th className="py-5 sm:pl-10 pl-2 w-1/4 text-base text-gray-800">Student</th>
                                    <th className="py-5 w-1/4 text-base text-gray-800">Book Borrowed</th>
                                    <th className="py-5 w-1/4 text-base text-gray-800 pl-20">Check Out Date</th>
                                    <th className="py-5 w-1/4 text-base text-gray-800 pr-2 sm:pr-10 text-right">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 text-xs sm:text-sm">Student Name</td>
                                    <td className="pr-2 py-5 text-gray-800 text-xs sm:text-sm">Book Name</td>
                                    <td className="pr-2 py-5 text-gray-800 text-xs sm:text-sm text-center">Date Out</td>
                                    <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">Date Due</td>
                                </tr>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 text-xs sm:text-sm">Student Name</td>
                                    <td className="pr-2 py-5 text-gray-800 text-xs sm:text-sm">Book Name</td>
                                    <td className="pr-2 py-5 text-gray-800 text-xs sm:text-sm text-center">Date Out</td>
                                    <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">Date Due</td>
                                </tr>

                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default BooksOut;