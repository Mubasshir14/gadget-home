// UnauthorizedPage.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logOut();
                navigate('/login'); // Redirect to login page after logout
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        handleLogout();
    }, [logOut, navigate]);

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                    <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                        <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </p>
                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Unauthorized Page</h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">You have been logged out and redirected to the login page.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UnauthorizedPage;
