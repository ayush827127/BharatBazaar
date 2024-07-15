// Shop.js
import Link from 'next/link';
import { FaStar, FaCircle } from 'react-icons/fa';

const Shop = ({ shops }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Shops</h1>
      <div className="flex flex-wrap justify-center p-6  min-h-screen">
        {shops.map((shop) => (
          <Link key={shop.id} href={`/shop/${shop.id}`}>
            <div className="w-64 mx-4 my-4 bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2">
              <img
                className="w-full h-40 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
                src={shop.shop_image}
              />
              <div className="p-4">
                <div className="font-bold text-lg mb-1 text-gray-800">
                  {shop.name}
                </div>
                <div className="flex items-center justify-center mb-2">
                  <FaStar className="w-3 h-3 text-yellow-500 mr-1" />
                  <span className="text-gray-700 text-sm mr-2">
                    {shop.rating}
                  </span>
                  <FaCircle className="w-2 h-2  mr-1" />
                  <span className="text-gray-600 text-xs">
                    {shop.avg_delivery_time}
                  </span>
                </div>
                <div className="text-gray-800 text-sm font-semibold">
                  {shop.category}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
