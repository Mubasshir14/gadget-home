import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FlashProduct = ({ item }) => {
  return (
    <div>
      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 border-[#59C6D2]/40 border-2 hover:scale-105 duration-1000 transform">
        {/* Product Name */}
        <div className="px-4 py-2 h-12">
          <h1 className="text-xs font-bold uppercase text-[#59C6D2]">
            {item.name}
          </h1>
        </div>

        {/* Product Image */}
        <div className="relative">
          <img
            className="object-cover w-full h-48 mt-2 border-t-2"
            src={item.image}
            alt={item.name}
          />
          {/* Hot Sale Badge */}
          <div className="absolute top-4 right-2 -rotate-12 bg-[#59C6D2] font-bold text-white px-2 py-1 rounded-lg">
            🔥Flash Deals
          </div>
        </div>

        {/* Price and View Button */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#59C6D2]">
          <h1 className="text-lg font-bold text-white">Tk. {item.price}</h1>
          <Link
            to={`/product/${item._id}`}
            className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none cursor-pointer"
          >
            <FaEye className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlashProduct;
