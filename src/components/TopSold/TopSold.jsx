import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios';
import Product from '../Product/Product';

const TopSold = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/product')
            .then((response) => {
                const newArrivalProducts = response.data.filter(product => product.subcategory === 'topsale');
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
        <div>
            <div className='max-w-screen-xl mx-auto md:mb-20 p-2'>
            <div className="flex w-full flex-col">

                <div className="divider text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Top Sold</div>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {
                    arrival.map((product) => (
                        <Product item={product} key={product.id} />
                    ))
                }

            </div>
        </div>
        </div>
    );
};

export default TopSold;