import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useCart from '../hooks/UseCart';

const PaymentSuccess = () => {
    const { tranId } = useParams();
    const [cart, refetch] = useCart();

    useEffect(() => {
        // Function to delete a cart item
        const handleDelete = async id => {
            try {
                const response = await axios.delete(`https://server-6685.onrender.com/carts/${id}`);
                if (response.data.deletedCount > 0) {
                    refetch(); // Refresh the cart after deletion
                    Swal.fire({
                        title: "Success!",
                        text: "Your payment has been completed.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "No payment has done yet.",
                        icon: "error"
                    });
                }
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred.",
                    icon: "error"
                });
            }
        };

        // Directly delete each item in the cart
        cart.forEach(item => {
            handleDelete(item._id);
        });
    }, [cart, tranId, refetch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    {/* Success Icon */}
                    <svg
                        className="w-16 h-16 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h1>
                <h1 className="text-2xl font-bold text-green-600 mb-2">Transaction ID: <span className='text-green-600 text-xl font-medium'>{tranId}</span></h1>
                <p className="text-gray-700 mb-6">Thank you for your purchase. Your transaction was completed successfully.</p>
                {/* Button to Continue Shopping */}
                <div className='flex gap-4 justify-center'>
                <Link to='/order' className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                    View Details
                </Link>
                <Link to='/' className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Continue Shopping
                </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
