import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>ELECTRONICS STORE</h1>

      {products.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default App;