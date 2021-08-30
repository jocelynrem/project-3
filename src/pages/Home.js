import { LockClosedIcon } from '@heroicons/react/solid'
import bookworm from "../images/CA101-7.png"
import signinModal from '../components/signin'
import { Popover } from '@headlessui/react'

export function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="self-center">
                    <img
                        className="w-20 object-contain float-left mb-5"
                        src={bookworm}
                        alt="watercolor bookworm"
                    />
                </div>
                <h2 className="mt-8 sm:mt-12 text-center text-3xl font-extrabold text-dark">Sign in to your account</h2>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
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
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-lt-green focus:border-lt-green focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-dark focus:ring-lt-green border-lt-gray rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dark hover:bg-lt-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lt-green"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                    <Popover>
                    <p className="text-right">New to Bookworm? <Popover.Button> Create an account</Popover.Button> </p>
                    </Popover>
                </form>
            </div>
        </div>
    )
}