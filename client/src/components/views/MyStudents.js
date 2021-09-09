import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { ADD_STUDENT } from "../../utils/mutations";
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

const Students = [
    { id: 1, firstName: 'Dylan', lastName: 'Something', comments: 'Kind of an asshole' },
    { id: 2, firstName: 'Sally', lastName: 'Otherthing', comments: 'Avoid his parents at all costs' },
    { id: 3, firstName: 'Kylie', lastName: 'Blahblah', comments: 'Nose picker- beware!' },
    { id: 4, firstName: 'Matthew', lastName: 'Whatever', comments: 'Goes to the bathroom every 10 minutes. Let him go or he will wet his pants' },

]

const MyStudents = ({ name }) => {
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
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {Students.map((item) => (
                                <div key={item.id} className="pt-6">
                                    <div className="flow-root bg-gray-100 rounded-lg px-6 pb-8">
                                        <div className="-mt-6">
                                            <div>
                                                <span className="inline-flex items-center justify-center p-3 bg-lime-500 rounded-md shadow-lg">
                                                    <h3 className="text-lg font-medium text-gray-900 tracking-tight">{item.firstName} {item.lastName}</h3>
                                                </span>
                                            </div>

                                            <p className="my-5 py-5 text-base text-gray-600">
                                                {item.comments}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
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

const StudentModal = () => {
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

    console.log('data from MyStudents:', data);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("before Mutation")
            const { info } = await addStudent({
                variables: {
                    teacherId,
                    studentInfo: { ...formState }
                },
            });
            console.log("AFTER");
            console.log("data from add Student: ", formState);
            console.log("name from student:", info)

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
                            <p className="text-gray-800 font-bold text-lg leading-tight tracking-normal">
                                Add Students
                            </p>
                            <div className="">
                                <div className="mt-4 md:mr-16">
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
                                <div className="mt-4 md:mr-16">
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
                                <div className="mt-4 md:mr-16">
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
                                <button className="my-2 bg-dark transition duration-150 ease-in-out hover:bg-lt-green rounded text-white px-5 py-1 text-xs">Add</button>

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

export default MyStudents;
