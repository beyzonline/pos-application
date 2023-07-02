import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import Add from "./Add";

const Products = ({ categories, filtered, products, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))

        .map((item) => (
          <ProductItem item={item} />
        ))}
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 hover:opacity-90 min-h-[180px] flex justify-center items-center"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl text-white" />
      </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 hover:opacity-90 min-h-[180px] flex justify-center items-center"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="md:text-2xl text-white" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>

  );
};

export default Products;