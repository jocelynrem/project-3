import React from 'react';

function Signin(props) {
    const closeModal = () => {
        props.onClose()
    }

    return (
        <>
            <div onClick={closeModal} className="w-full h-full z-0 absolute inset-0" />
            <div className="mx-auto container">
                <div className="flex items-center justify-center h-full w-full">
                    <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
                        <div className="bg-dark rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                            <p className="text-white text-lg uppercase">Create New User</p>
                            <button onClick={closeModal} className="focus:outline-none">
                                <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 7L7 21" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7 7L21 21" stroke="#FFFFFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-4 md:px-10 pt-6 md:pt-12 md:pb-4 pb-7">
                            <form>
                                <div className="flex items-center">
                                    <input placeholder="Full Name" className="w-full focus:outline-none placeholder-dk-gray py-3 px-3 text-sm leading-none text-dk-gray bg-white border rounded border-dark" />
                                </div>
                                <div className="flex items-center mt-8">
                                    <input placeholder="Email" type="email" className="w-full focus:outline-none placeholder-dk-gray py-3 px-3 text-sm leading-none text-dk-gray bg-white border rounded border-dark" />
                                </div>
                            </form>
                            <div className="flex items-center justify-end mt-9">
                                <button onClick={closeModal} className="px-6 py-3 mx-4 bg-dk-gray hover:bg-opacity-80 hover:text-dark shadow rounded text-sm text-white">
                                    Cancel
                                </button>
                                <button className="px-6 py-3 bg-orange text-dark hover:bg-opacity-80 shadow rounded text-sm">Add User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signin;