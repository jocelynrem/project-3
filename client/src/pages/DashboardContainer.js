import React, { useState } from 'react';
import SidebarLinks from '../components/SidebarLinks';
import { Redirect, useParams } from 'react-router-dom';
import MobileNav from '../components/MobileNav';
import AddBook from '../components/views/AddBook';
import MyStudents from '../components/views/MyStudents';
import Profile from '../components/views/Profile';
import ReadingLog from '../components/views/ReadingLog';
import Dashboard from '../components/views/Dashboard';
import readingWorm from "../images/CA101-3.png";
import { GET_FINDTHETEACHER, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

export default function DashboardContainer() {
    
    const [currentView, setcurrentView] = useState('Dashboard');

    const teacherId = localStorage.getItem('teacher_id');
    console.log('this is the teachers Id from DashContainer:', teacherId)
    const { loading, data } = useQuery(GET_FINDTHETEACHER, {
        variables: { id: teacherId },
    });

    console.log('loading from DashContainer:', loading)
    console.log('data from DashContainer:', data)

    const renderPage = () => {
        if (currentView === 'readinglog') {
            return <ReadingLog />;
        }
        if (currentView === 'addbook') {
            return <AddBook />;
        }
        if (currentView === 'mystudents') {
            return <MyStudents />;
        }
        if (currentView === 'profile') {
            return <Profile
                name={data.findtheteacher.firstName}
                email={data.findtheteacher.email}
            />;
        }
        return <Dashboard
        // name={data.findtheteacher.firstName}
        />;
    };

    const handlePageChange = (page) => setcurrentView(page);

    return (
        <div className="flex flex-no-wrap">
            {/* Sidebar */}
            <div className="w-64 absolute bg-dark shadow-sm h-screen sm:relative flex-col justify-between hidden md:flex">
                <div className="px-8">
                    <ul className="mt-4">
                        <SidebarLinks currentView={currentView} handlePageChange={handlePageChange} />
                    </ul>
                    <img className="h-28 mt-8 ml-2 flex items-center" src={readingWorm} alt='watercolor of bookworm reading a book' />
                </div>
            </div>
            <div>
                <MobileNav handlePageChange={handlePageChange} />
            </div>

            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="ml-0 m:ml: w-full h-full rounded border-dashed border-2 border-gray-300">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
}