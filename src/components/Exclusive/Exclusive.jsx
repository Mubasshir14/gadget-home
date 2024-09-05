import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';

const Exclusive = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('https://server-6685.onrender.com/product')
            .then((response) => {
                const newArrivalProducts = response.data.filter(product => product.subcategory === 'blank');
                setArrival(newArrivalProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <Loader />;


    return (
        <div className='max-w-screen-xl mx-auto md:mb-20 p-2'>
            <div>
            <div className="text-[#59C6D2] divider font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Online Exclusive Products</div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {
                        arrival.slice(0, 12).map((product) => (
                            <Product item={product} key={product._id} />
                        ))
                    }
                </div>
                <div className='flex items-center justify-center mt-2'>
                <Link to='/all-product' className="btn btn-outline text-[#59C6D2] font-bold border-[#59C6D2]">All Product</Link>
                </div>
            </div>
        </div>
    );
};

export default Exclusive;
