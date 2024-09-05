import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { FcApprove } from 'react-icons/fc';
import { ImCancelCircle } from 'react-icons/im';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const ManageOrder = () => {
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

    const updateOrderStatus = (orderId, status) => {
        Swal.fire({
            title: `Are you sure you want to ${status} this order?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Disable the buttons for this order ID
                axios.put(`https://server-6685.onrender.com/order/${orderId}`, { status })
                    .then(response => {
                        setArrival(prevOrders =>
                            prevOrders.map(order =>
                                order._id === orderId ? { ...order, status } : order
                            )
                        );
                        Swal.fire({
                            title: 'Success!',
                            text: `Order has been ${status}.`,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    })
                    .catch(error => {
                        console.error("Error updating order status:", error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong while updating the order status.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        });
    };

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
                                        <td className="py-2 px-4 uppercase font-bold">User Email</td>
                                        <td className="py-2 px-4 uppercase font-bold">Transaction ID</td>
                                        <td className="py-2 px-4 uppercase font-bold">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrival.map((order, orderIndex) => (
                                        order.cartItems.map((item, itemIndex) => (
                                            <tr key={item._id} className="border-t">
                                                <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{orderIndex + 1}.{itemIndex + 1}</td>
                                                <td className="py-2 px-4">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mx-auto" />
                                                </td>
                                                <td className="py-2 px-4 text-[#737373]">{item.name}</td>
                                                <td className="py-2 px-4 text-[#737373]">{order.email}</td>
                                                <td className="py-2 px-4 text-[#737373]">{order.transectionId}</td>
                                                <td className="py-2 px-4 flex gap-1">
                                                    <button
                                                        onClick={() => updateOrderStatus(order._id, 'approved')}
                                                        className="bg-[#59C6D2] text-white btn px-2 py-2 rounded mx-auto"
                                                        disabled={order.status === 'approved' || order.status === 'canceled'} // Disable if already approved or canceled
                                                    >
                                                        <FcApprove />
                                                    </button>
                                                    <button
                                                        onClick={() => updateOrderStatus(order._id, 'canceled')}
                                                        className="bg-[#59C6D2] text-white btn px-2 py-2 rounded mx-auto"
                                                        disabled={order.status === 'approved' || order.status === 'canceled'} // Disable if already approved or canceled
                                                    >
                                                        <ImCancelCircle />
                                                    </button>
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

export default ManageOrder;
