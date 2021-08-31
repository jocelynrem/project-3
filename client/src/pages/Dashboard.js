import readingWorm from "../images/CA101-5.png"

const navLinks = [
    { name: 'Dashboard', href: 'dashboard' },
    { name: 'Add A Book', href: 'addbook' },
    { name: 'My Students', href: 'mystudents' },
    { name: 'Reading Log', href: 'readinglog' },
    { name: 'Profile', href: 'profile' }
]

export default function Dashboard() {
    return (
        <div className="flex flex-no-wrap">
            {/* Sidebar */}
            <div className="w-64 absolute bg-dark shadow h-screen sm:relative flex-col justify-between hidden sm:flex">
                <div className="px-8">
                    <img className="h-24 flex items-center" src= {readingWorm} alt='watercolor of bookworm reading a book'/>

                    <ul className="mt-12">
                        {navLinks.map((item) => (
                            <li className="flex w-full justify-between cursor-pointer items-center mb-6">
                                <div className="flex items-center">
                                    <a key={item.name} href={item.href} className="ml-2 text-lt-gray hover:text-orange">
                                        {item.name}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* End Sidebar */}

            {/* Dashbaord */}
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="ml-0 m:ml: w-full h-full rounded border-dashed border-2 border-gray-300">
                   <p>Dashboard Content</p>
                   
                
                </div>
            </div>
            {/* End Dashbaord */}
        </div>
    );
}
