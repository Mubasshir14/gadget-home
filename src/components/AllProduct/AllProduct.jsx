import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const AllProduct = () => {
    const [arrival, setArrival] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('default');
    const itemsPerPage = 16;

    useEffect(() => {
        axios.get('http://localhost:5000/product')
            .then((response) => {
                setArrival(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
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

    if (loading) return <Loader />;

    // Sort the items based on the selected option
    const sortedItems = sortItems([...arrival]);

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className='max-w-screen-xl mx-auto md:mb-20 p-2'>
            <Helmet>
                <title>Gadget Home || All Products</title>
            </Helmet>
            <div>
                <div className="text-[#59C6D2] font-bold text-xl md:text-2xl font-cinzel text-center mb-8">All Products</div>

                {/* Sorting options */}
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
                        currentItems.map((product) => (
                            <Product item={product} key={product.id} />
                        ))
                    }
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 text-white bg-[#59C6D2] rounded hover:bg-[#59C6D2] disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 text-[#59C6D2] font-bold py-2 mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-2 text-white bg-[#59C6D2] rounded hover:bg-[#59C6D2] disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
