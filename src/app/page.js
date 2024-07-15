"use client"

import { useEffect, useState } from "react";
import HomePagePosters from "./_components/HomePagePosters";
import Products from "./_components/Products";
import Shop from "./_components/Shop";

export default function Home() {
  const [shop, setShops] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await fetch("https://mocki.io/v1/9a6bc53b-9cba-4a7a-a38b-03c0e534a310");
        if (!response.ok) {
          throw new Error("Failed to fetch shop data");
        }
        const data = await response.json();
        setShops(data.vendors);

        // Extract products from each vendor
        const allProducts = data.vendors.flatMap(vendor => vendor.products);

        // Sort products by rating (assuming rating is available in each product)
        const sortedProducts = allProducts.sort((a, b) => b.rating - a.rating);

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching shop data:", error);
      }
    };

    fetchShopData();
  }, []);

  return (
    <div className="text-5xl text-center">
      <HomePagePosters />
      <Products products={products} />
      <Shop shops={shop} />
    </div>
  );
}
