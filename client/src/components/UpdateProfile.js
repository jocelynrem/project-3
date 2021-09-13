import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODIFY_TEACHER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

function UpdateProfile({ firstName, lastName, email, id, onClose }) {
    const closeModal = () => {
        onClose()
    }

    const teacherId = localStorage.getItem('teacher_id');

    const [formState, setFormState] = useState({
        id,
        firstName,
        lastName,
        email
    });

    const [modifyTeacher, { error, data }] = useMutation(MODIFY_TEACHER);

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await modifyTeacher({
                variables: { ...formState },
            });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="flex items-center bg-dark justify-center p-8">
                <div className="md:w-96 bg-white rounded shadow-sm p-5">
                    <div className="sm:flex items-strech">
                        <div className="pt-2 pb-4 w-full">
                            <div className="flex flex-rows items-center w-full">
                                <p className="text-3xl font-bold leading-6 text-dark">Update Profile</p>
                            </div>
                            <div className="mt-4 w-full text-left">
                                {data ? (
                                    <h1> Success! </h1>
                                ) : (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="items-center justify-center pb-5">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row m-2 md:mr-16">
                                                    <input id="firstName"
                                                        name="firstName"
                                                        type="firstName"
                                                        value={formState.firstName}
                                                        onChange={handleChange}
                                                        autoComplete="first-name"
                                                        required
                                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="First Name" />
                                                </div>
                                                <div className="flex flex-row m-2 md:mr-16">
                                                    <input id="lastName"
                                                        name="lastName"
                                                        type="lastName"
                                                        value={formState.lastName}
                                                        onChange={handleChange}
                                                        autoComplete="family-name"
                                                        required
                                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Last Name" />
                                                </div>
                                            </div>
                                            <div className="flex flex-row md:flex-row">
                                                <div className="flex flex-col m-2 md:mr-16">
                                                    <input id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formState.email}
                                                        onChange={handleChange}
                                                        autoComplete="email"
                                                        required
                                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Email" />
                                                </div>
                                            </div>
                                            <button onKeyPress={handleFormSubmit} className="m-2 bg-blue-900 transition duration-150 ease-in-out hover:bg-blue-700 rounded text-white px-10 py-2">Update</button>
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
                    </div>
                </div>
                <div onClick={closeModal} className="cursor-pointer absolute top-0 right-0 m-3 text-lt-gray transition duration-150 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="#FFFFFF" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;