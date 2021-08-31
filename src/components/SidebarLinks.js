const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' }
]

function SidebarLinks({ currentPage, handlePageChange }) {
    return (
        <ul className="mt-12">
            {navLinks.map((item) => (
                <li className="flex w-full justify-between cursor-pointer items-center mb-6">
                    <div className="flex items-center ml-2 text-lt-gray hover:text-orange">
                        <p key={item.name} onClick={() => handlePageChange(`${item.href}`)}
                            className={currentPage === `${item.href}`}>
                            {item.name}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default SidebarLinks;
