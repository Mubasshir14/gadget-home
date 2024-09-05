import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FaCartShopping } from 'react-icons/fa6';
import { AuthContext } from '../Providers/AuthProvider';
import useCart from '../hooks/UseCart';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import SubmitReview from './SubmitReview';
import useReview from '../hooks/useReview';
import StarRatings from 'react-star-ratings';

// Custom styles for the modal
const modalStyles = {
    content: {
        top: '60%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '500px',
        backgroundColor: '#59C6D2', // Background color
        color: 'black', // Text color for better contrast
        padding: '20px', // Padding inside the modal
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for better visibility
    },
};

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [reviews, refetchReviews] = useReview(); // Assuming useReview returns an array of reviews

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://server-6685.onrender.com/product/${id}`);
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
        }
        // Add more images if available
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

            axios.post('https://server-6685.onrender.com/carts', cartItem)
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

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleReviewSubmitted = () => {
        refetchReviews(); // Refetch reviews to ensure the latest data is shown
        closeModal(); // Close modal after review submission
    };

    // Filter reviews to show only the one matching the product name
    const productReview = reviews.filter(review => review.productName === product.name);

    return (
        <div className='max-w-screen-xl mx-auto my-20 p-4 md:p-8'>
            <div className='flex flex-col md:flex-row'>
                <div className='flex-1 mb-6 md:mb-0'>
                    <ImageGallery
                        items={images}
                        showFullscreenButton={true}
                        additionalClass="border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={openModal}
                        className='bg-[#59C6D2] text-white px-4 py-2 rounded-lg mt-2'
                    >
                        Add Review
                    </button>
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
                        <FaCartShopping className='text-2xl text-white' />
                    </button>
                </div>
            </div>
            {/* Review Display */}
            {productReview.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
                    {productReview.map((review, index) => (
                        <div key={index} className="mb-6 border-2 border-[#59C6D2] md:w-6/12 p-3 rounded-lg">
                            <div className="flex items-center mb-4">
                                Ratings:
                                <StarRatings
                                    rating={review.rating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension='20px'
                                    starSpacing='2px'
                                />
                            </div>
                            <p className="text-lg mb-2">Review: {review.reviewText}</p>
                            <p className="text-lg font-semibold mb-2">User: {review.name}</p>
                            <p className="text-lg text-gray-600">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Review Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Review Modal"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Submit Your Review</h2>
                <SubmitReview user={user}
                    productName={product.name} onReviewSubmitted={handleReviewSubmitted} />
                <div className='flex justify-end'>
                    <button
                        onClick={closeModal}
                        className="mt-4 py-2 px-4 rounded border border-gray-300"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductDetails;
