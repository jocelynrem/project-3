import { Popover, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { Fragment } from 'react';
import Auth from '../utils/auth';

const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' }
]

export default function MobileNav({ handlePageChange }) {
    return (
        <Popover>
            <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-dark hover:text-lt-green focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
            </div>
            <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="relative top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                    <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="px-2 pt-2 pb-3 text-dark">
                            {navLinks.map((item) => (
                                <p
                                    key={item.name}
                                    onClick={() => handlePageChange(`${item.href}`)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-dark">
                                    {item.name}
                                </p>
                            ))}
                            <p
                                onClick={() => Auth.logout()}
                                className='block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-dark'>
                                Log out
                            </p>
                        </div>

                    </div>
                </Popover.Panel>
            </Transition >
        </Popover >
    )
}