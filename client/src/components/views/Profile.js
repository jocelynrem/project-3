import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UPDATE_TEACHER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

export default function Profile({ name, lastName, email}) {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const teacherId = localStorage.getItem('teacher_id');
    console.log('this is the teachers Id from Profile:', teacherId)
    return (
        <>
            <h1 className=''>{name}'s Profile</h1>
            <p className='m-2'><b>First Name: </b> {name}</p>
            <p className='m-2'><b>Last Name: </b> {lastName}</p>
            <p className='m-2'><b>Email: </b> {email}</p>
            <h1 className=''> Edit User Information: </h1>
            <p className='m-2'><b>Please enter the updated first name, last name, email, and password for this account. </b></p>
            <div className="items-center justify-center pb-5">
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col m-2 md:mr-16">
                            <input id="firstName" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="First Name" />
                        </div>
                        <div className="flex flex-col m-2 md:mr-16">
                            <input id="lastName" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col m-2 md:mr-16">
                            <input id="email" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Email" />
                        </div>
                        <div className="flex flex-col m-2 md:mr-16">
                            <input id="password" className="text-gray-600 focus:outline-none focus:border focus:border-lt-green bg-white font-normal w-64 h-10 flex items-center pl-2 text-sm border-gray-300 rounded border shadow" placeholder="Password" />
                        </div>
                    </div>
                    <button className="flex flex-col m-2 md:mr-16">Update</button>
            </div>
        </>  
    )

};