import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentFail = () => {
    const { tranId } = useParams();
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    {/* Error Icon */}
                    <svg
                        className="w-16 h-16 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3m0 3h.01M5.5 5.5l13 13M18.5 5.5L5.5 18.5"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Failed!</h1>
                <p className="text-lg text-gray-800 mb-4">Transaction ID: <span className="font-medium text-red-600">{tranId}</span></p>
                <p className="text-gray-600 mb-6">We're sorry, but your payment could not be processed. Please try again later or contact support if the issue persists.</p>
                <Link to="/cart" className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                    Try Again
                </Link>
            </div>
        </div>
    );
};

export default PaymentFail;
