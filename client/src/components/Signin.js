import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ADD_TEACHER} from '../utils/mutations'
import { useMutation } from '@apollo/client'; 
import Auth from '../utils/auth';

//Maybe change name to SignUP?

function Signin(props) {
    const closeModal = () => {
        props.onClose()
    }

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [addTeacher, {error, data}] = useMutation(ADD_TEACHER);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("formState from signup: ", formState);

        try {
            console.log("before Mutation")
            const {data} = await addTeacher({
                variables: { ...formState},
            });
            console.log("AFTER");
            console.log("data from singup: ", data);
            console.log("id from teacher:", data.addTeacher.teacher._id)
            // Auth.login(data.addTeacher.token);
            Auth.login(data.addTeacher);    

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
                            <div className="flex flex-col items-center w-full">
                                <p className="text-3xl font-bold leading-6 text-dark">Create An Account</p>
                            </div>
                            <div className="mt-4 w-full text-left">
                            {data ? (
                                <Link to="/dashboard">Go to Dashboard</Link>
                            ) : (
                                <form onSubmit={handleFormSubmit}>
                                    <input type="hidden" name="remember" defaultValue="true" />
                                    <div className="rounded-md shadow-sm -space-y-px">                                    <label htmlFor="name" className="sr-only">
                                        First Name
                                    </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="firstName"
                                            value={formState.firstName}
                                            onChange={handleChange}
                                            autoComplete="first-name"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dark rounded-t-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="sr-only">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="lastName"
                                            value={formState.lastName}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dark focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dark focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formState.password}
                                            onChange={handleChange}
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dark rounded-b-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                            placeholder="Password"
                                        />
                                    </div>
                                        <button type='submit'
                                            className="mt-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dark hover:bg-lt-green focus:outline-none focus:ring-2 focus:ring-lt-green"
                                        >
                                            Submit
                                        </button>
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

export default Signin;

