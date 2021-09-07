import React, { useState } from "react";
const StudentDropdown = ({ studentArray }) => {
    const [show, setShow] = useState(true);

    return (
        <div className="mx-auto py-5">
            <div className="container flex justify-center mx-auto h-20">
                <div className="h-full">
                    {/* Code block starts */}
                    <div className="relative">
                        <div className="bg-white flex items-center justify-between border rounded border-gray-300 w-40 cursor-pointer" onClick={() => setShow(!show)}>
                            <p className="pl-3 py-3 text-gray-600 text-sm leading-3 tracking-normal font-normal">View Student</p>
                            <div className="cursor-pointer text-gray-600 mr-3">
                                {show ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="6 15 12 9 18 15" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        {show && (
                            <ul className="visible transition duration-300 opacity-100 bg-white shadow rounded mt-2 w-48 py-1 absolute">
                                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">Student Name</li>
                                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">Student Name</li>
                                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">Student Name</li>
                                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">Student Name</li>
                                <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">Student Name</li>

                            </ul>
                        )}
                    </div>
                    {/* Code block ends */}
                </div>
            </div>
        </div>
    );
};
export default StudentDropdown;
