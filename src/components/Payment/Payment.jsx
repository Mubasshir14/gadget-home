import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import Axios
import { AuthContext } from '../Providers/AuthProvider';
import useCart from '../hooks/UseCart';

const Payment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [cart] = useCart();
    const [currency, setCurrency] = useState('BDT'); // Default currency
    const deliveryFee = 150; // Fixed delivery fee

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0) + deliveryFee;

    // Handle currency change
    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
    };

    // Convert total price based on selected currency
    const displayPrice = currency === 'USD'
        ? (totalPrice / 110).toFixed(2)  // Example conversion rate from BDT to USD
        : totalPrice.toFixed(2);         // Default to BDT

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Convert displayPrice to a number
            const totalAmount = Number(displayPrice);
    
            if (isNaN(totalAmount) || totalAmount <= 0) {
                Swal.fire({
                    title: "Invalid Amount",
                    text: "The total amount must be a positive number.",
                    icon: "error"
                });
                return;
            }
    
            // Prepare order details
            const orderDetails = {
                ...data,
                email: user.email,
                total: totalAmount, 
                currency,
                deliveryFee, 
                items: cart.map(item => ({ id: item.id, price: item.price })), 
            };
    
            
            const response = await axios.post('https://server-6685.onrender.com/order', orderDetails);
            
            if (response.status === 200) {
                const result = response.data;
    
               
                if (result.url) {
                    window.location.replace(result.url); 
                } else {
                    Swal.fire({
                        title: "Payment Successful!",
                        text: "Your payment has been processed.",
                        icon: "success"
                    });
                }
            } else {
                throw new Error("Failed to process payment");
            }
        } catch (error) {
            Swal.fire({
                title: "Payment Error",
                text: error.message,
                icon: "error"
            });
        }
    };
    
    return (
        <div className="max-w-screen-md mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8">
            <h2 className="text-[#59C6D2] font-bold text-2xl md:text-3xl font-cinzel text-center mb-8">Payment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-md border border-gray-200">
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address"
                            }
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                        readOnly
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Mobile</label>
                    <input
                        type="text"
                        {...register("mobile", { required: "Address is required" })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your address"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Address</label>
                    <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your address"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Upzilla</label>
                    <input
                        type="text"
                        {...register("upzilla", { required: "Upzilla is required" })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your upzilla"
                    />
                    {errors.upzilla && <p className="text-red-500 text-sm">{errors.upzilla.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Zilla</label>
                    <input
                        type="text"
                        {...register("zilla", { required: "Zilla is required" })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your zilla"
                    />
                    {errors.zilla && <p className="text-red-500 text-sm">{errors.zilla.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Postcode</label>
                    <input
                        type="text"
                        {...register("postcode", { required: "Postcode is required" })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your postcode"
                    />
                    {errors.postcode && <p className="text-red-500 text-sm">{errors.postcode.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Currency</label>
                    <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        className="w-full p-2 border border-gray-300 rounded bg-white"
                    >
                        <option value="BDT">BDT</option>
                        <option value="USD">USD</option>
                        {/* Add more currencies as needed */}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Total Price (Includes Delivery Fee: 150 BDT)</label>
                    <input
                        type="text"
                        value={`${currency} ${displayPrice}`}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                </div>

                <button type="submit" className="w-full bg-[#59C6D2] text-white py-2 rounded font-cinzel text-xl">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default Payment;
