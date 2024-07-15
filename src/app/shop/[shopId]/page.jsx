const ShopDetail = ({ params }) => {

  return (
    <div>
      <h1>Shop Detail Page</h1>
      <p>Shop ID: {params.shopId}</p>
      {/* Add your shop detail rendering logic here */}
    </div>
  );
};

export default ShopDetail;
