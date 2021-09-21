/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { HiOutlineTrash, HiX } from "react-icons/hi";
import swal from 'sweetalert';

import { ADD_STUDENT, REMOVE_STUDENT } from "../../utils/mutations";
import { GET_FINDTHETEACHER } from "../../utils/queries"

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

const MyStudents = ({ name }) => {
    const teacherId = localStorage.getItem('teacher_id');

    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="relative bg-white pb-16 text-center">
                <div className="sm:px-6 w-full">
                    <div className="p-4">
                        <div className="lg:flex items-center justify-between">
                            <h1 className="text-center text-blue-900 font-medium tracking-wide text-4xl uppercase"> {name}'s Students: </h1>
                            <button onClick={handleOpen} className="inline-flex ml-1.5 items-start justify-start px-10 py-3 bg-blue-900 hover:bg-blue-800 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">Add Student</p>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                            {data.findtheteacher.students.map((student) => {
                                return (
                                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                                        <StudentCard
                                            key={student.id}
                                            firstName={student.firstName}
                                            lastName={student.lastName}
                                            comments={student.comments}
                                            id={student._id}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
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
                                <StudentModal onClose={handleClose} />
                            </div>
                        </Fade>
                    </Modal>
                </div >
            </div>
        </>
    );
};

const StudentModal = (props) => {
    const closeModal = () => {
        props.onClose()
    }
    const teacherId = localStorage.getItem('teacher_id');

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        comments: '',
    });


    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });

    const [addStudent, { error, stuinfo }] = useMutation(ADD_STUDENT);

    // console.log('data from MyStudents:', data);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // console.log("before Mutation")
            const { info } = await addStudent({
                variables: {
                    teacherId,
                    studentInfo: { ...formState }
                },
            });
            // console.log("AFTER");
            // console.log("data from add Student: ", formState);
            // console.log("name from student:", info)

            setFormState({
                firstName: '',
                lastName: '',
                comments: '',
            })
        } catch (error) {
            console.error(error);
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };
    return (
        <div className="container p-6 mx-auto">
            <div className="flex flex-wrap">
                {stuinfo ? (
                    <Link to="/dashboard">Success! Redirecting to Your Dashboard.</Link>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <div className="rounded border-gray-300  border-dashed border-2 p-5 bg-gray-100">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-800 font-bold text-lg">
                                        Add Students
                                    </p>
                                </div>
                                <div className="sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={closeModal}
                                    >
                                        <span className="sr-only">Close</span>
                                        <HiX className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="">
                                <div className="mt-4">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="firstName"
                                        value={formState.firstName}
                                        onChange={handleChange}
                                        autoComplete="first-name"
                                        required
                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                        placeholder="First Name" />
                                </div>
                                <div className="mt-4">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="lastName"
                                        value={formState.lastName}
                                        onChange={handleChange}
                                        autoComplete="family-name"
                                        required
                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                        placeholder="Last Name" />
                                </div>
                                <div className="mt-4 ">
                                    <input
                                        id="comments"
                                        name="comments"
                                        type="comments"
                                        value={formState.comments}
                                        onChange={handleChange}
                                        autoComplete="comments"
                                        required
                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow"
                                        placeholder="Comments" />
                                </div>
                                <div className="flex justify-end">
                                    <button onKeyPress={handleFormSubmit} className="mt-3 bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-900 rounded text-white px-7 py-1 text-sm">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
                {error && (
                    <div className="my-3 p-3 bg-orange text-white">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    )
}

const StudentCard = ({ comments, firstName, lastName, id, }) => {
    const teacherId = localStorage.getItem('teacher_id');
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });
    const [removeStudent, { error, stuinfo }] = useMutation(REMOVE_STUDENT)

    const handleDeleteStudent = async (event) => {

        // console.log(event.target.id)
        // console.log(data.findtheteacher.students)
        const studentData = data.findtheteacher.students.find((student) => student._id === event.target.id)
        // console.log('studentData:', studentData)
        swal({
            title: "Are you sure?",
            text: "Do you want to delete this student all their data?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    removeStudent({
                        variables: {
                            teacherId,
                            studentInfo: { firstName: studentData.firstName, lastName: studentData.lastName }
                        },
                    });
                    swal("Student has been deleted", {
                        icon: "success",
                    });
                } else {
                    swal("Student Saved");
                }
            });
        // await removeStudent({
        //     variables: {
        //         teacherId,
        //         studentInfo: { firstName: studentData.firstName, lastName: studentData.lastName }
        //     },
        // });
    }
    const notify = () => {
        swal({
            title: "Are you sure?",
            text: "Do you want to delete this student all their data?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    handleDeleteStudent();
                    swal("Student has been deleted", {
                        icon: "success",
                    });
                } else {
                    swal("Student Saved");
                }
            });
    }
    const [show, setShow] = useState(null);

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg" key={id}>
            <div className="p-4 sm:px-6 bg-gray-200 inline-flex w-full justify-between">
                <div>
                    <h3 className="text-xl leading-6 font-medium text-gray-900">{firstName} {lastName} </h3>
                </div>
                <div className='text-gray-400'>
                    <button
                        onClick={handleDeleteStudent}
                        id={id}
                        style={{ cursor: 'pointer' }}
                        type="button"
                        className="inline-flex items-center px-1 py-1 border border-transparent shadow-sm text-xs rounded-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                        <HiOutlineTrash className="-ml-0.5 mr-1 h-4 w-4" aria-hidden="true" />
                        Student
                    </button>
                </div>
            </div>

            <div className="border-t border-blue-900 pt-1 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 mt-5 gap-y-2 sm:grid-cols-1">
                    <div className="sm:col-span-1">
                        <dt className="font-medium uppercase text-blue-800">Currently Reading</dt>
                        <dd className="mt-1 text-sm text-gray-900">Bathtime for Biscuit</dd>
                    </div>
                    <div className='flex justify-between'>
                        <div className="sm:col-span-2 inline-flex">
                            <dt className="font-medium text-left text-lime-600">Notes</dt>
                            <div className="cursor-pointer">
                                {show == 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(null)} aria-label="Show" className="icon icon-tabler icon-tabler-chevron-down" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(0)} aria-label="Hide" className=" icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#718096" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="6 15 12 9 18 15" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </dl>
            </div>
            <div className="border-t border-blue-900 mx-4 py-2 sm:px-6 text-left">
                {show == 0 && (
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-1">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">09/20/2021</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {comments}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">09/18/2021</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                Progress monitored for letter sounds
                            </dd>
                        </div>
                    </dl>
                )}
            </div>
        </div>
    )
}

export default MyStudents;