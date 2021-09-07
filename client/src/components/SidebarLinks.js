import Auth from '../utils/auth';


const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' },
]

function SidebarLinks({ currentPage, handlePageChange }) {
    return (
        <>
            <ul className="mt-2">
                {navLinks.map((item) => (
                    <li key={item.name} className="flex w-full justify-between cursor-pointer items-center mb-4">
                        <div className="flex items-center ml-2 tracking-wider text-xl font-light">
                            <p
                                onClick={() => handlePageChange(`${item.href}`)}
                                className={`${currentPage}` === `${item.href}` ? 'text-orange' : 'text-lt-gray hover:text-orange'}>
                                {item.name}
                            </p>
                        </div>
                    </li>
                ))}
                <li className="flex w-full justify-between cursor-pointer items-center mb-4">
                        <div className="flex items-center ml-2 tracking-wider text-xl font-light">
                            <p
                                onClick={() => Auth.logout()}
                                className='text-lt-gray hover:text-orange'>
                                Log out
                            </p>
                        </div>
                    </li>
            </ul>
        </>
    );
}

export default SidebarLinks;
