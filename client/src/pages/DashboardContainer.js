import React, { useState } from 'react';
import SidebarLinks from '../components/SidebarLinks';
import MobileNav from '../components/MobileNav';
import AddBook from '../components/views/AddBook';
import MyStudents from '../components/views/MyStudents';
import Profile from '../components/views/Profile';
import ReadingLog from '../components/views/ReadingLog';
import Dashboard from '../components/views/Dashboard';
import MyLibrary from '../components/views/MyLibrary';
import readingWorm from '../images/CA101-3.png';
import { GET_FINDTHETEACHER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth'; // 9/8 adding for jwt authentication

export default function DashboardContainer() {
    const [currentView, setcurrentView] = useState('Dashboard');

    const teacherId = localStorage.getItem('teacher_id');
    console.log('this is the teachers Id from DashContainer:', teacherId);
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });

    console.log('loading from DashContainer:', loading);
    console.log('data from DashContainer:', data);

    if (loading) {
        return <div className='container mx-auto sm:p-5 md:p-10'>
            <h1>
                Loading...
            </h1>
            <svg className='animate-spin'
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true" role="img" width="5em" height="5em"
                preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M12 7a1 1 0 1 0 1 1a1 1 0 0 0-1-1zm-5.696 9.134a1 1 0 1 0 1.366.366a1 1 0 0 0-1.366-.366zm11.392 0a1 1 0 1 0 .366 1.366a1 1 0 0 0-.366-1.366zm2.914-2.791a4.918 4.918 0 0 0-4.526-1.197l-.419-.763a4.989 4.989 0 0 0-2.503-8.251a5.035 5.035 0 0 0-4.279.958A4.978 4.978 0 0 0 7 8a4.929 4.929 0 0 0 1.352 3.392l-.419.75a4.989 4.989 0 0 0-5.926 6.286a5.03 5.03 0 0 0 2.97 3.226a4.97 4.97 0 0 0 6.588-3.19l.867.014a4.981 4.981 0 0 0 4.76 3.524a5.017 5.017 0 0 0 4.8-3.573a4.95 4.95 0 0 0-1.382-5.086zm-.528 4.495a3.006 3.006 0 0 1-4.386 1.76a2.965 2.965 0 0 1-1.352-1.705a1.994 1.994 0 0 0-1.91-1.43h-.869a1.995 1.995 0 0 0-1.91 1.43a2.98 2.98 0 0 1-3.948 1.899a2.993 2.993 0 0 1 1.767-5.704a1.967 1.967 0 0 0 2.173-.942l.436-.754a1.995 1.995 0 0 0-.281-2.369a2.98 2.98 0 0 1 .329-4.37a2.993 2.993 0 0 1 4.069 4.369a2 2 0 0 0-.283 2.37l.435.753a1.974 1.974 0 0 0 2.174.943a2.988 2.988 0 0 1 3.556 3.75z" fill="currentColor" />
            </svg>
        </div>;
    }
    if (!data) {
        return (
            <h4>
                You need to be logged in to see your profile page.
            </h4>
        );
    }

    const renderPage = () => {
        if (currentView === 'readinglog') {
            return <ReadingLog name={data.findtheteacher.firstName} />;
        }
        if (currentView === 'mylibrary') {
            return <MyLibrary name={data.findtheteacher.firstName} />;
        }
        if (currentView === 'addbook') {
            return <AddBook name={data.findtheteacher.firstName} />;
        }
        if (currentView === 'mystudents') {
            return <MyStudents
                name={data.findtheteacher.firstName}
            />;
        }
        if (currentView === 'profile') {
            return (
                <Profile
                    id={data.findtheteacher._id}
                    firstName={data.findtheteacher.firstName}
                    lastName={data.findtheteacher.lastName}
                    email={data.findtheteacher.email}
                />
            );
        }
        return <Dashboard name={data.findtheteacher.firstName} />;
    };
    const handlePageChange = (page) => setcurrentView(page);
    const loggedIn = Auth.loggedIn();
    console.log('loggedIn:', loggedIn)

    return (


        <div className='flex'>
            {/* Sidebar */}
            <div className='w-52 bg-gradient-to-t from-blue-800 to-blue-900 shadow-sm h-screen hidden md:sticky top-0 justify-between md:flex'>
                <div className='px-8'>
                    <ul className='mt-4'>
                        <SidebarLinks
                            currentView={currentView}
                            handlePageChange={handlePageChange}
                        />
                    </ul>
                    <img
                        className='h-28 mt-8 ml-2 flex items-center'
                        src={readingWorm}
                        alt='watercolor of bookworm reading a book'
                    />
                </div>
            </div>

            <div className='container mx-auto py-2 md:w-4/5 w-11/12 px-3'>
                <div className='p-2'>
                    <MobileNav handlePageChange={handlePageChange} />
                </div>
                {loggedIn ? (
                    <div className='ml-0 rounded border-dashed border-2 border-lt-gray'>
                        {renderPage()}
                    </div>
                ) : (
                    <h4>
                        You need to be logged in to see this page.
                    </h4>
                )}
            </div>
        </div>


    );
}
