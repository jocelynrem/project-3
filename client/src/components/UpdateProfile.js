/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODIFY_TEACHER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { HiX } from "react-icons/hi";


function UpdateProfile({ firstName, lastName, email, id, onClose }) {
    const closeModal = () => {
        onClose()
    }

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
            <div className="flex items-center bg-dark justify-center p-4">
                <div className="bg-white rounded shadow-sm p-5">
                    <div className="sm:flex items-strech">
                        <div className="py-2 w-full">
                            <div className="flex justify-between">
                                <div className="flex flex-rows items-center w-full">
                                    <p className="text-3xl font-bold leading-6 text-dark">Update Profile</p>
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
                            <div className="mt-4 w-full text-left">
                                {data ? (
                                    <h1> Success! </h1>
                                ) : (
                                    <form onSubmit={handleFormSubmit}>

                                        <div className="items-center justify-center pb-2">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row m-2">
                                                    <input id="firstName"
                                                        name="firstName"
                                                        type="firstName"
                                                        value={formState.firstName}
                                                        onChange={handleChange}
                                                        autoComplete="first-name"
                                                        required
                                                        className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="First Name" />
                                                </div>
                                                <div className="flex flex-row m-2">
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
                                                <div className="flex flex-col m-2">
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
            </div>
        </>
    );
}

export default UpdateProfile;