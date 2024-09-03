import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, subcategory, details, price, _id } = useLoaderData();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            // Image upload to imgbb and then get an URL
            const imageFile = { image: data.image[0] };
            const imageRes = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (imageRes.data.success) {
                // Prepare the updated product data
                const updatedProductItem = {
                    name: data.name,
                    category: data.category,
                    subcategory: data.subcategory,
                    price: parseFloat(data.price),
                    details: data.details,
                    image: imageRes.data.data.display_url
                };

                // Send the updated product data to the server with PATCH
                const productRes = await axios.patch(`http://localhost:5000/product/${_id}`, updatedProductItem);

                if (productRes.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} has been updated successfully.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "info",
                        title: `No changes were made to ${data.name}.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className='max-w-screen-xl mx-auto  p-4 md:p-8'>
            <div className="text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">All Products</div>

            <div className='flex items-center justify-center'>
                
                <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-6">
                    {/* Form Fields */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Product Name*</span>
                        </div>
                        <input {...register("name", { required: "Product Name is required" })} defaultValue={name} type="text" placeholder="Product Name" className="input input-bordered w-full" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </label>

                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Category Selection */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Category*</span>
                            </div>
                            <select defaultValue={category} {...register("category", { required: "Category is required" })} className="select select-bordered w-full">
                                <option disabled value='default'>Select category</option>
                                <option value="earbuds">Earbuds</option>
                                <option value="smartwatch">Smartwatch</option>
                                <option value="cover">Cover</option>
                                <option value="earphone">Earphone</option>
                                <option value="adapter">Adapter</option>
                                <option value="powerbank">Powerbank</option>
                                <option value="speaker">Speakers</option>
                                <option value="microphone">Microphone</option>
                                <option value="fan">Fan</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                        </label>
                        {/* Sub Category Selection */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Sub Category*</span>
                            </div>
                            <select defaultValue={subcategory} {...register("subcategory", { required: "Subcategory is required" })} className="select select-bordered w-full">
                                <option disabled value='default'>Select subcategory</option>
                                <option value="flashdeal">Flash Deal</option>
                                <option value="newarrival">New Arrival</option>
                                <option value="topsale">Top Sale</option>
                                <option value="blank">None</option>
                            </select>
                            {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
                        </label>

                        {/* Price Input */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text text-gray-700">Price*</span>
                            </div>
                            <input {...register("price", { required: "Price is required", valueAsNumber: true })} type="number" defaultValue={price} placeholder="Price" className="input input-bordered w-full" />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </label>
                    </div>

                    {/* Product Details Text Area */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text text-gray-700">Product Details*</span>
                        </div>
                        <textarea {...register("details", { required: "Product Details are required" })} defaultValue={details} className="textarea textarea-bordered w-full" placeholder="Product Details"></textarea>
                        {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
                    </label>

                    {/* File Input for Images */}
                    <div className="form-control w-full my-6">
                        <input {...register("image", { required: "Image is required" })} type="file" accept="image/*" className="file-input w-full" />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full my-6 text-white p-2 rounded flex items-center justify-center gap-2 bg-[#59C6D2]">
                        Update Gadget
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
