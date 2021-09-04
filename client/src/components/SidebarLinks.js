const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' },
    { name: 'Log Out', href: '/' }

]

function SidebarLinks({ currentPage, handlePageChange }) {
    return (
        <ul className="mt-2">
            {navLinks.map((item) => (
                <li className="flex w-full justify-between cursor-pointer items-center mb-4">
                    <div className="flex items-center ml-2 tracking-wider text-xl font-light">
                        <p key={item.name} onClick={() => handlePageChange(`${item.href}`)}
                            className={`${currentPage}` === `${item.href}` ? 'text-orange' : 'text-lt-gray hover:text-orange'}>
                            {item.name}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default SidebarLinks;
