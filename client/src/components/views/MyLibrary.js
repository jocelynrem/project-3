
import { GET_FINDTHETEACHER } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function MyLibrary({ name }) {
    const teacherId = localStorage.getItem('teacher_id');
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });
    console.log( console.log('books:', data.findtheteacher.books))

    return (
        <>
            <h1 className='uppercase font-light text-3xl m-2 text-md-green'>{name}'s' Library</h1>
            <div>
            <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                    <thead>

                        <tr className="border-b border-gray-300 dark:border-gray-700">
                            <th className="py-5 sm:pl-10 pl-2 w-1/4 text-base text-gray-800 dark:text-gray-100">Title</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100">Author</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Description</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Available Copies</th>

                        </tr>
                    </thead>
        <tbody>
            {data.findtheteacher.books.map((item) => (
                <tr key={item.bookId}>
                    <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{item.title}</td>
                    <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{item.authors}</td>
                    <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">{item.description}</td>
                    <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">{item.copiesAvailable}</td>
                    {/* <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right"><img src = {item.image}/></td> */}
                </tr>
                       ))}
        </tbody>
        </table>
            </div>
        </>

    )}