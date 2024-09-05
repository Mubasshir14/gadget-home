import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { FaTrashAlt } from 'react-icons/fa'; 
import { AuthContext } from '../Providers/AuthProvider';
import img from '../../assets/user.png'
const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://server-6685.onrender.com/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8'>
                <div className="text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Manage Users</div>
                <div className="max-w-4xl mx-auto shadow-md bg-white border border-gray-200">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                            <div className="md:text-3xl text-xl font-semibold font-cinzel mb-4 md:mb-0">
                                Total Users: {users.length} {/* Corrected to use users */}
                            </div>
                            <div className="md:text-3xl text-xl font-semibold font-cinzel mb-4 md:mb-0">
                                {/* Add total price calculation if needed */}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr className="bg-[#59C6D2] text-white">
                                        <td className="py-2 px-4 uppercase font-bold">#</td>
                                        <td className="py-2 px-4 uppercase font-bold">Image</td>
                                        <td className="py-2 px-4 uppercase font-bold">Name</td>
                                        <td className="py-2 px-4 uppercase font-bold">Email</td>
                                        <td className="py-2 px-4 uppercase font-bold">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => ( // Changed arrival to users
                                        <tr key={user._id} className="border-t">
                                            <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{index + 1}</td>
                                            <td className="py-2 px-4 ">
                                                <img src={user.photoURL || user?.photoURL || img} alt={user.name} className="w-12 h-12 object-cover mx-auto" />
                                            </td>
                                            <td className="py-2 px-4 text-[#737373]">{user.name}</td>
                                            <td className="py-2 px-4 text-[#737373]">{user.email}</td>
                                            <td className="py-2 px-4 flex space-x-2">
                                                <button
                                                    // onClick={() => handleDelete(user._id)}
                                                    className="bg-red-500 text-white px-2 py-2 rounded btn">
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUser;
