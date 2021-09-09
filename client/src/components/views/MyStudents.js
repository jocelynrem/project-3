import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import StudentDropdown from "../StudentDropdown";
import { ADD_STUDENT } from "../../utils/mutations";
import { GET_FINDTHETEACHER} from "../../utils/queries"

const MyStudents = (props) => {
    
    const teacherId = localStorage.getItem('teacher_id');

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        comments: '',
    });
    

    const {loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });

    const [addStudent, {error, stuinfo}] = useMutation(ADD_STUDENT);

    console.log('data from MyStudents:', data);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("before Mutation")
            const { info } = await addStudent({
                variables: { 
                    teacherId,
                    studentInfo: {...formState} },
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
        <>
            <div className="container p-6 mx-auto">
                <div className="flex flex-wrap">
                    <div className="md:w-3/5 w-full md:pb-0 md:pr-6">
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
                    <div className="md:w-2/5 w-full">
                        <div className="rounded border-gray-300 p-5 border-dashed border-2 bg-gray-500">
                            <StudentDropdown />
                        </div>
                    </div>
                </div>
            </div>

            {/* student table */}
            <div>
                <table className="w-full shadow text-left bg-white dark:bg-gray-800">
                    <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-700">
                            <th className="py-5 sm:pl-10 pl-2 w-1/4 text-base text-gray-800 dark:text-gray-100">Student</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100">Currently Reading</th>
                            <th className="py-5 w-1/4 text-base text-gray-800 dark:text-gray-100 pr-2 sm:pr-10 text-right">Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                            {data.findtheteacher.students.map((student) => {
                                return (
                                    <tr key={student.id}>
                                <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">{student.firstName} {student.lastName}</td>
                                <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">Book Name</td>
                                <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">{student.comments}</td>
                        </tr>
                            );   
                            })}
                        {/* <tr className="bg-gray-200 dark:bg-gray-700">
                            <td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">Student Name</td>
                            <td className="pr-2 py-5 text-gray-800 dark:text-gray-100 text-xs sm:text-sm">Book Name</td>
                            <td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">Date Due</td>
                        </tr> */}

                    </tbody>
                </table>
            </div>

        </>
    );
};

export default MyStudents;
