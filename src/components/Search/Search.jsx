import React, { useEffect, useState } from 'react';
import ing1 from '../../assets/ads1.png';
import ing2 from '../../assets/ads2.png';
import ing3 from '../../assets/ads3.png';
import ing4 from '../../assets/ads4.png';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Product from '../Product/Product';

const Search = () => {
    const [arrival, setArrival] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState('default');

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

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.text.value.toLowerCase();

        const filterProduct = arrival.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText) ||
            product.subcategory.toLowerCase().includes(searchText)
        );

        setFilteredProduct(filterProduct);
        e.target.reset();
    };

    const handleSort = (event) => {
        setSortOption(event.target.value);
    };

    const sortItems = (items) => {
        const sortedItems = [...items];
        switch (sortOption) {
            case 'price-asc':
                return sortedItems.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sortedItems.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sortedItems;
        }
    };

    const sortedItems = sortItems(filteredProduct);

    if (loading) return <Loader />;

    return (
        <div className='max-w-screen-xl mx-auto p-2'>
            <div className='p-2 min-h-[calc(100vh-350px)]'>
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto mb-10"
                >
                    <label className="input input-bordered focus:border-[#59C6D2] flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            name="text"
                            placeholder="Search..."
                            className="grow px-4 py-2 rounded-lg outline-none transition duration-300 w-full md:w-auto"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#59C6D2] font-semibold text-white rounded-lg hover:bg-[#59C6D2] transition duration-300 w-full md:w-auto"
                    >
                        Search
                    </button>
                </form>

                <div>
                    {filteredProduct.length > 0 ? (
                        <div>
                            <h1 className="md:text-3xl my-4 font-cinzel font-semibold text-center">Your Search Result</h1>
                            <div className="flex justify-center mb-6">
                                <select
                                    onChange={handleSort}
                                    value={sortOption}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    <option value="default">Sort By</option>
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="price-asc">Price (Low to High)</option>
                                    <option value="price-desc">Price (High to Low)</option>
                                </select>
                            </div>

                            <div className='grid grid-cols-1 p-2 md:grid-cols-3 gap-6 mt-6 mb-4'>
                                {sortedItems.map((item) => (
                                    <Product key={item._id} item={item} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500"></p>
                    )}
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto'>
                    <div>
                        <img src={ing1} alt="Advertisement 1" />
                    </div>
                    <div>
                        <img src={ing2} alt="Advertisement 2" />
                    </div>
                    <div>
                        <img src={ing3} alt="Advertisement 3" />
                    </div>
                    <div>
                        <img src={ing4} alt="Advertisement 4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
