import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { Helmet } from 'react-helmet';

const Earbuds = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('default');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://server-6685.onrender.com/product')
            .then((response) => {
                const newArrivalProducts = response.data.filter(product => product.category === 'earbuds');
                setArrival(newArrivalProducts);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortItems = (items) => {
        switch (sortOption) {
            case 'price-asc':
                return items.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return items.sort((a, b) => b.price - a.price);
            case 'alphabetically':
                return items.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return items;
        }
    };

    // Memoize the sorted items
    const sortedItems = useMemo(() => sortItems([...arrival]), [arrival, sortOption]);

    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className='max-w-screen-xl mx-auto md:mb-20 p-2'>
            <Helmet>
                <title>Gadget Home || Earbuds</title>
            </Helmet>
                <div className="flex w-full flex-col">
                    <div className=" text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">Earbuds</div>
                </div>
                <div className="flex justify-end mb-4 outline-0">
                    <select value={sortOption} onChange={handleSortChange} className="px-4 py-2 border rounded text-[#59C6D2]">
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="alphabetically">A-Z</option>
                    </select>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    {
                        sortedItems.map((product) => (
                            <Product item={product} key={product._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Earbuds;
