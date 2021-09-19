import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { Fragment } from 'react';
import Auth from '../utils/auth';

const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'My Library', href: 'mylibrary' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' }
]

export default function MobileNav({ handlePageChange }) {
    return (
        <>
            <div className="flex items-center md:hidden">
                <Menu as="div" className="relative">
                    <div>
                        <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="z-40 origin-top-left absolute left-0 w-72 rounded-md shadow-lg py-3 bg-white ring-1 ring-blue-900 ring-opacity-50 focus:outline-none">
                            {navLinks.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <p
                                            onClick={() => handlePageChange(`${item.href}`)}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-blue-900">
                                            {item.name}
                                        </p>
                                    )}
                                </Menu.Item>

                            ))}
                            <Menu.Item>
                                {({ active }) => (
                                    <p
                                        onClick={() => Auth.logout()}
                                        className='block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-blue-900'>
                                        Log out
                                    </p>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </>
    )
}

// {/* <Menu as="div" className="ml-3 relative">
//                   <div>
//                     <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
//                       <span className="sr-only">Open main menu</span>
//                             {open ? (
//                                 <XIcon className="block h-6 w-6" aria-hidden="true" />
//                             ) : (
//                                 <MenuIcon className="block h-6 w-6" aria-hidden="true" />
//                             )}
//                     </Menu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-200"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     {navLinks.map((item) => (
//                 <Menu.Item>
//                 {({ active }) => (
//                               <p
//                               key={item.name}
//                               onClick={() => handlePageChange(`${item.href}`)}
//                               className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-dark">
//                               {item.name}
//                           </p>
//                 )}
//               </Menu.Item>

//             ))}
//                       <Menu.Item>
//                         {({ active }) => (
//                                         <p
//                                         onClick={() => Auth.logout()}
//                                         className='block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-dark'>
//                                         Log out
//                                     </p>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>

//  */}
