import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

const NewArrival = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://server-6685.onrender.com/product')
            .then((response) => {
                const newArrivalProducts = response.data.filter(product => product.subcategory === 'newarrival');
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
            <div className="flex w-full flex-col">

                <div className="divider text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">New Arrival</div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {
                    arrival.map((product) => (
                        <Product item={product} key={product._id} />
                    ))
                }

            </div>
        </div>
    );
};

export default NewArrival;