/* eslint-disable eqeqeq */

import { GET_FINDTHETEACHER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';


export default function MyLibrary({ name }) {
    const teacherId = localStorage.getItem('teacher_id');
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });
    console.log(console.log('books:', data.findtheteacher.books))

    return (
        <>
            <h1 className='uppercase text-right font-light text-3xl m-2 text-lime-600'>{name}'s' Library</h1>
            <div>
                <table className="w-full shadow text-left bg-white">
                    <thead className="bg-gray-100">
                        <tr className="border-b border-gray-300">
                            <th className="py-2 w-3/9 sm:pl-10 pl-2">Title</th>
                            <th className="py-2 w-2/9 text-left">Author</th>
                            <th className="py-2 w-1/9 pr-2 sm:pr-10 text-right">Copies</th>
                            <th className="py-2 w-3/9 pr-2 sm:pr-10 text-center">Description</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.findtheteacher.books.map((item) => (
                            <BooksTable
                                bookId={item.bookId}
                                authors={item.authors}
                                title={item.title}
                                description={item.description}
                                copiesAvailable={item.copiesAvailable}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}

const BooksTable = ({ bookId, title, authors, description, copiesAvailable }) => {

    const [show, setShow] = useState(null);

    return (
        <>
            <tr key={bookId} className=''>
                <td className="w-3/9 pl-2 pr-5 py-2 text-gray-800 font-semibold text-xs sm:text-sm">{title}</td>
                <td className="w-2/9 pr-5 py-2 text-gray-800 text-xs sm:text-sm text-left">{authors}</td>
                <td className="w-1/9 py-2 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-center">{copiesAvailable}</td>
                <td className="w-3/9 py-2 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-right">
                    <div className="">
                        <div className="flex justify-center">
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
                            <p className="text-right">Description</p>
                        </div>
                        {show == 0 && (
                            <p className="mt-2 text-sm text-left text-gray-600">
                                {description}
                            </p>
                        )}
                    </div>
                </td>
            </tr>
        </>
    )
}
