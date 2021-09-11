
import { GET_FINDTHETEACHER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';


export default function MyLibrary({ name }) {
    const teacherId = localStorage.getItem('teacher_id');
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });
    console.log(console.log('books:', data.findtheteacher.books))

    const [show, setShow] = useState(null);

    return (
        <>
            <h1 className='uppercase font-light text-3xl m-2 text-md-green'>{name}'s' Library</h1>
            <div>
                <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                    <thead>

                        <tr className="border-b border-gray-300 dark:border-gray-700">
                            <th className="py-5 sm:pl-10 pl-2 w-1/5 text-base text-gray-800 dark:text-gray-100">Title</th>
                            <th className="py-5 w-1/5 text-base text-gray-800 dark:text-gray-100">Author</th>
                            <th className="py-5 w-2/5 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Description</th>
                            <th className="py-5 w-1/5 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Available Copies</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.findtheteacher.books.map((item) => (
                            <tr key={item.bookId}>
                                <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{item.title}</td>
                                <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{item.authors}</td>
                                <td className="py-2 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">
                                    <div className="">
                                        <div className="flex justify-end">
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
                                            <p className="mt-2 text-sm text-gray-600">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </td>
                                <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">{item.copiesAvailable}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}