import React from 'react';

function Signin(props) {
    const closeModal = () => {
        props.onClose()
    }

    return (
        <>
            <div className="flex items-center justify-center p-8">
                <div className="md:w-96 bg-lt-gray rounded shadow-sm p-5">
                    <div className="sm:flex items-strech">
                        <div className="pt-2 pb-4 w-full">
                            <div className="flex flex-col items-center w-full">
                                <p className="text-3xl font-bold leading-6 text-dark">Create An Account</p>
                            </div>
                            <div className="mt-4 w-full text-left">
                                <div className="my-3 py-1">
                                    <label htmlFor="name" className="sr-only">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="name"
                                        autoComplete="name"
                                        required="true"
                                        className="appearance-none opacity-90 relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dk-gray rounded-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="my-3 py-1">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required="true"
                                        className="appearance-none opacity-90 relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dk-gray rounded-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="my-3 py-1">
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required="true"
                                        className="appearance-none opacity-90 relative block w-full px-3 py-2 border border-lt-gray placeholder-dk-gray text-dk-gray rounded-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                                <a href='dashboard'>
                                    <button type='submit'
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-dark text-white hover:bg-lt-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lt-green">
                                        Submit
                                    </button></a>
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

