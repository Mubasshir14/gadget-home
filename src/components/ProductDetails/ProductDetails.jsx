import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'; // Add Link here
import Loader from '../Loader/Loader';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FaCartShopping } from 'react-icons/fa6';
import { AuthContext } from '../Providers/AuthProvider';
import useCart from '../hooks/UseCart';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to fetch product details. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;

    const images = [
        {
            original: product.image,
            thumbnail: product.image,
        },
        {
            original: product.image,
            thumbnail: product.image,
        },
        {
            original: product.image,
            thumbnail: product.image,
        },
    ];

    const descriptionParagraphs = product.details.split('.').filter(paragraph => paragraph.trim() !== '');

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                productId: product._id,
                email: user.email,
                name: product.name,
                price: product.price,
                image: product.image
            };
            console.log("Product ID:", product._id);

            axios.post('http://localhost:5000/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${product.name} Added To The Cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add item to cart. Please try again.',
                    });
                });
        } else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add items to the cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className='max-w-screen-xl mx-auto my-20 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row'>
                <div className='flex-1 mb-6 md:mb-0'>
                    <ImageGallery 
                        items={images} 
                        showFullscreenButton={true}
                        additionalClass="border border-gray-300 rounded-lg"
                    />
                </div>
                <div className='flex-1 md:ml-8'>
                    <h1 className="text-2xl font-bold mb-4">
                        {product.name}
                    </h1>
                    <p className="text-xl text-[#59C6D2] font-bold mb-4">
                        <span className='text-[#59C6D2]'>Tk.</span>
                        {product.price}
                    </p>
                    <p className="text-xl text-gray-900/40 font-semibold mb-4">
                        Warranty: <span className='text-lg text-[#59C6D2]'>No Warranty Available</span>
                    </p>
                    <p className="text-xl text-gray-900/40 font-semibold mb-4">
                        Color: <span className='text-[#59C6D2]'>One Color</span>
                    </p>
                    <div className="text-lg text-gray-700 mb-6">
                        {descriptionParagraphs.map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph.trim()}.
                            </p>
                        ))}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#59C6D2] w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold text-white md:text-2xl"
                    >
                        Add To Cart
                        <FaCartShopping className='text-2xl text-white'/>
                    </button>
                    {/* <Link to={`/update/${product._id}`} className='btn'>Edit</Link> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
