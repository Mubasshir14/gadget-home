import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const Ordered = () => {
    const { user } = useContext(AuthContext);
    const [arrival, setArrival] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://server-6685.onrender.com/order')
            .then((response) => {
                setArrival(response.data);
                setTotalOrders(response.data.length);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setError("Error fetching orders");
                setLoading(false);
            });
    }, []);

    // Filter orders based on user's email and extract cartItems
    const matched = arrival.filter(order => order.email === user?.email);

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8'>
            <div className="text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Ordered Products</div>
            <div className="">
                <div className="max-w-4xl mx-auto shadow-md bg-white border border-gray-200">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                            <div className="md:text-3xl text-xl font-semibold font-cinzel mb-4 md:mb-0">
                                {/* Total orders: {totalOrders} */}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr className="bg-[#59C6D2] text-white">
                                        <td className="py-2 px-4 uppercase font-bold">#</td>
                                        <td className="py-2 px-4 uppercase font-bold">Image</td>
                                        <td className="py-2 px-4 uppercase font-bold">Name</td>
                                        <td className="py-2 px-4 uppercase font-bold">Transaction ID</td>
                                        <td className="py-2 px-4 uppercase font-bold">Status</td>
                                        <td className="py-2 px-4 uppercase font-bold">View Details</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {matched.map((order, orderIndex) => (
                                        order.cartItems.map((item, itemIndex) => (
                                            <tr key={item._id} className="border-t">
                                                <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{orderIndex + 1}.{itemIndex + 1}</td>
                                                <td className="py-2 px-4">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mx-auto" />
                                                </td>
                                                <td className="py-2 px-4 text-[#737373]">{item.name}</td>
                                                <td className="py-2 px-4 text-[#737373]">{order.transectionId}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        disabled
                                                        className={`text-white px-2 py-2 rounded mx-auto ${
                                                            order.status === 'approved' ? 'bg-[#bae1e5] font-bold text-green-900' : 
                                                            order.status === 'canceled' ? 'bg-red-400' : 
                                                            'bg-[#59C6D2]'
                                                        }`}>
                                                        {order.status === 'approved' ? 'Approved' : 
                                                         order.status === 'canceled' ? 'Canceled' : 
                                                         'Processing'}
                                                    </button>
                                                </td>
                                                <td className="py-2 px-4">
                                                <Link
                                                        to={`/order/${order.transectionId}`}
                                                        className="bg-[#59C6D2] text-white btn px-2 py-2 rounded mx-auto"
                                                    >
                                                        <FaEye/>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
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

export default Ordered;
