"use client";

import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Products = ({ products }) => {
  const [visibleRows, setVisibleRows] = useState(2);

  const calculateVisibleCards = () => {
    const cardsPerRow = 6; // Number of cards per row
    const totalVisibleCards = visibleRows * cardsPerRow; // Total visible cards
    return Math.min(totalVisibleCards, products.length); // Ensure not to exceed total products
  };

  const handleSeeMore = () => {
    setVisibleRows((prevRows) => prevRows + 1); // Increase visible rows by 1
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="w-3 h-3 text-yellow-500 mr-1" />
          ))}
        {halfStar && <FaStarHalfAlt className="w-3 h-3 text-yellow-500 mr-1" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} className="w-3 h-3 text-yellow-500 mr-1" />
          ))}
      </>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.slice(0, calculateVisibleCards()).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg flex flex-col hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQrdmC6-g6JsFUdwXqtCtUuwNR1S7XpmU6BIhi5RiU-cDb8aaoJGHVAgPgYKJglcVGsMrwMRxaoP3yRiyCZ9xRcxY0iSt66ysCKlfMqHUE2&usqp=CAE"
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <div className="flex-grow pt-2 pb-2">
              <p className="text-lg font-semibold truncate">{product.name}</p>
              <p className="text-gray-700 text-sm">{product.category}</p>
            </div>
            <div className="flex items-center justify-center ">
              {renderStars("4.5")} 
              {/* change 4.5 with product.rating variable */}
              <span className="text-gray-700 text-sm mr-2">4.5</span>
            </div>
            <div className="px-4 p-1">
              <p className="text-gray-900 text-sm font-semibold">
                ${product.price}
              </p>
            </div>
            <div className="px-4 pb-4">
              <button
                className="w-full bg-green-400 text-white py-1.5 rounded-md font-medium text-sm hover:bg-green-500 transition duration-200"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
      {visibleRows * 6 < products.length && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSeeMore}
            className="text-green-400 font-semibold text-xl px-4 rounded"
          >
            See More Products &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
