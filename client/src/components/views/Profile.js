import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MODIFY_TEACHER } from '../../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../../../src/utils/auth';

export default function Profile({ firstName, lastName, email, id }) {
    console.log('id:', id);
    const [searchInput, setSearchInput] = useState('');
    const teacherId = localStorage.getItem('teacher_id');
    const [formState, setFormState] = useState({
        id,
        firstName,
        lastName,
        email
    });
    const [modifyTeacher, { error, data }] = useMutation(MODIFY_TEACHER);
    
    // const handleKeyPress = (event) => {
    //     if (event.keyCode === 13) {
    //         handleFormSubmit();
    //     }
    // }
    
    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("formState from profile: ", formState);

        try {
            console.log("before Mutation")
            const { data } = await modifyTeacher({
                variables: { ...formState },
            });
            console.log("AFTER");
            console.log("data from profile: ", data);
            console.log("id from teacher:", data.modifyTeacher.teacher._id)
            // Auth.login(data.addTeacher.token);
            // Auth.login(data.modifyTeacher);

        } catch (error) {
            console.log('error hit')
            console.error(error);
        }
    }
    console.log('this is the teachers Id from Profile:', teacherId)
    console.log('name and last name', lastName)
    return (
        <>
            <h1 className=''>{firstName}'s Profile</h1>
            <p className='m-2'><b>First Name: </b> {firstName}</p>
            <p className='m-2'><b>Last Name: </b> {lastName}</p>
            <p className='m-2'><b>Email: </b> {email}</p>
            <h1 className=''> Edit User Information: </h1>
            <p className='m-2'><b>Please enter the updated first name, last name, and email for this account. </b></p>
            {data ? (
                <Link to="/dashboard"></Link>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <div className="items-center justify-center pb-5">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex flex-col m-2 md:mr-16">
                                <input id="firstName"
                                    name="firstName"
                                    type="firstName"
                                    value={formState.firstName}
                                    onChange={handleChange}
                                    autoComplete="first-name"
                                    required
                                    className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="First Name" />
                            </div>
                            <div className="flex flex-col m-2 md:mr-16">
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
                        <div className="flex flex-col md:flex-row">
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
        </>
    )
};