// pages/shop/[shopId].jsx
import { useRouter } from 'next/router';

const ShopDetail = () => {
  const router = useRouter();
  const { shopId } = router.query; // Access shopId from router.query object

  // Example: Fetch shop details based on shopId
  // Replace this with your actual fetch logic
  // For demonstration, logging the shopId to console
  console.log('Shop ID:', shopId);

  return (
    <div>
      <h1>Shop Detail Page</h1>
      <p>Shop ID: {shopId}</p>
      {/* Add your shop detail rendering logic here */}
    </div>
  );
};

export default ShopDetail;
