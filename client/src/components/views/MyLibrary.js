/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

import { GET_FINDTHETEACHER } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { HiOutlineTrash } from "react-icons/hi";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import LibraryCard from '../LibraryCard';
import swal from 'sweetalert';
import { REMOVE_BOOK } from "../../utils/mutations";



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
}));

export default function MyLibrary({ name }) {
    const teacherId = localStorage.getItem('teacher_id');
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });
    // console.log(console.log('books:', data.findtheteacher.books))

    return (
        <>
            <h1 className='uppercase text-right font-light sm: text-2xl md:text-3xl m-2 text-lime-600'>{name}'s Library</h1>
            <div>
                <table className="w-full shadow text-left bg-white">
                    <thead className="bg-gray-100">
                        <tr className="border-b border-gray-300">
                            <th className="py-2 w-4/9 sm:pl-10 pl-2">Title</th>
                            <th className="py-2 w-2/9 pr-2 sm:pr-10">Copies</th>
                            <th className="py-2 w-3/9 pr-2 sm:pr-10">Delete</th>
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

const BooksTable = ({ bookId, title, copiesAvailable, authors, description }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [removeBook, { error, stuinfo }] = useMutation(REMOVE_BOOK)


    const handleDeleteBook = async (event) => {

        // const studentData = data.findtheteacher.students.find((student) => student._id === event.target.id)
        swal({
            title: "Are you sure?",
            text: "Do you want to delete this book",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    removeBook({
                        variables: {
                            bookId,
                        },
                    });
                    swal("Book has been deleted", {
                        icon: "success",
                    });
                } else {
                    swal("Book Saved");
                }
            });

    }

    return (
        <>
            <tr key={bookId} className=''>
                <td className="w-3/9 pl-2 pr-5 py-2 text-gray-800 font-semibold text-xs sm:text-sm">
                    <button
                        type='button'
                        className='hover:text-orange underline text-left py-2 sm:pl-10 pl-2'
                        onClick={handleOpen}>
                        {' '}
                        {title}
                    </button>
                </td>
                <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <LibraryCard
                                onClose={handleClose}
                                bookId={bookId}
                                authors={authors}
                                title={title}
                                description={description}
                                copiesAvailable={copiesAvailable}
                            />
                        </div>
                    </Fade>
                </Modal>
                <td className="w-1/9 py-2 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-center">{copiesAvailable}</td>
                <td className="w-1/9 py-2 text-gray-800 pr-2 sm:pr-10 text-xs sm:text-sm text-center">
                    <div className='text-gray-400'>
                        <button
                            onClick={handleDeleteBook}
                            id={bookId}
                            style={{ cursor: 'pointer' }}
                            type="button"
                            className="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-xs rounded-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                        >
                            <HiOutlineTrash className="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
                            Book
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}