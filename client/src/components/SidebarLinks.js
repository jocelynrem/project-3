import Auth from '../utils/auth';


const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'My Library', href: 'mylibrary' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' },
]

function SidebarLinks({ currentView, handlePageChange }) {
    return (
        <>
            <ul className="mt-2">
                {navLinks.map((item) => (
                    <li key={item.name} className="flex w-full justify-between cursor-pointer items-center mb-4">
                        <div className="flex items-center ml-2 tracking-wider text-xl font-light">
                            <p
                                onClick={() => handlePageChange(`${item.href}`)}
                                className={`${currentView}` === `${item.href}` ? 'text-lime-400' : 'text-lt-gray hover:text-lime-400'}>
                                {item.name}
                            </p>
                        </div>
                    </li>
                ))}
                <li className="flex w-full justify-between cursor-pointer items-center mb-4">
                    <div className="flex items-center ml-2 tracking-wider text-xl font-light">
                        <p
                            onClick={() => Auth.logout()}
                            className='text-lt-gray hover:text-lime-400'>
                            Log out
                        </p>
                    </div>
                </li>
            </ul>
        </>
    );
}

export default SidebarLinks;