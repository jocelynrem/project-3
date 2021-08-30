import { Popover, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'

const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' }
]

const Navigation = () => {
    return (
        <>
            <Popover>
                <nav class="flex items-center justify-between flex-wrap bg-dark text-lt-gray p-8">
                    <div class="flex items-center flex-shrink-0 text-lt-green hover:text-orange mr-6">
                        <span class="font-semibold text-4xl"><a href='/'> Bookworm</a></span>
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-lt-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <div className="hidden md:block md:ml-3 md:pr-4 md:space-x-8">
                        {navLinks.map((item) => (
                            <a key={item.name} href={item.href} className="font-medium text-lt-gray hover:text-orange">
                                {item.name}
                            </a>
                        ))}
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
                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">

                                <div className="px-2 pt-2 pb-3 text-dark">
                                    {navLinks.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:text-white hover:bg-dark"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>

                            </div>
                        </Popover.Panel>
                    </Transition>
                </nav>
            </Popover>


        </>
    )
};

export default Navigation;