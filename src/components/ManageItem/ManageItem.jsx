import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Swal from 'sweetalert2';

const ManageItem = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://server-6685.onrender.com/product')
            .then((response) => {
                setArrival(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    // Function to delete an item
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://server-6685.onrender.com/product/${id}`)
                    .then(() => {
                        // Remove the deleted item from the state
                        setArrival((prevArrival) => prevArrival.filter(item => item._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting product:", error);
                        Swal.fire(
                            'Error!',
                            'There was an issue deleting the product.',
                            'error'
                        );
                    });
            }
        });
    };

    if (loading) return <Loader />;

    return (
        <div>
            <div className='max-w-screen-xl mx-auto min-h-[calc(100vh-250px)] p-4 md:p-8'>
                <div className="text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Manage Products</div>
                <div className="max-w-4xl mx-auto shadow-md bg-white border border-gray-200">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between mb-6 items-center">
                            <div className="md:text-3xl text-xl font-semibold font-cinzel mb-4 md:mb-0">
                                Total Products: {arrival.length}
                            </div>
                            <div className="md:text-3xl text-xl font-semibold font-cinzel mb-4 md:mb-0">
                                {/* Total price: Tk.{totalPrice.toFixed(2)} */}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border">
                                <thead>
                                    <tr className="bg-[#59C6D2] text-white">
                                        <td className="py-2 px-4 uppercase font-bold">#</td>
                                        <td className="py-2 px-4 uppercase font-bold">Image</td>
                                        <td className="py-2 px-4 uppercase font-bold">Name</td>
                                        <td className="py-2 px-4 uppercase font-bold">Price</td>
                                        <td className="py-2 px-4 uppercase font-bold">Category</td>
                                        <td className="py-2 px-4 uppercase font-bold">Sub Category</td>
                                        <td className="py-2 px-4 uppercase font-bold">Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrival.map((item, index) => (
                                        <tr key={item._id} className="border-t">
                                            <td className="py-2 px-4 text-[hsl(0,0%,8%)] font-bold">{index + 1}</td>
                                            <td className="py-2 px-4 ">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mx-auto" />
                                            </td>
                                            <td className="py-2 px-4 text-[#737373]">{item.name}</td>
                                            <td className="py-2 px-4 text-[#737373]">Tk.{item.price.toFixed(2)}</td>
                                            <td className="py-2 px-4 text-[#737373] uppercase">{item.category}</td>
                                            <td className="py-2 px-4 text-[#737373] uppercase">{item.subcategory}</td>
                                            <td className="py-2 px-4 flex space-x-2">
                                                <Link to={`/update/${item._id}`} className="bg-[#59C6D2] text-white px-2 py-2 rounded btn">
                                                    <MdOutlineModeEditOutline />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
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

export default ManageItem;
