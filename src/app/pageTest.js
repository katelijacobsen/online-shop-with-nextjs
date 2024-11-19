"use client";
import useStore from "./store";
import { useEffect } from "react";

const Products = () => {
  const {
    products,
    filteredProducts,
    selectedCategory,
    search,
    cart,
    setProducts,
    setSelectedCategory,
    setSearch,
    addToCart,
    removeFromCart,
  } = useStore();

  // Hent data fra API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products`);
        const data = await res.json();
        setProducts(data.products); // Gem data i Zustand store
      } catch (error) {
        console.error("Fejl ved indlæsning af produkter:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <main>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSelectedCategory("")}>All</button>
        <button onClick={() => setSelectedCategory("smartphones")}>
          Smartphones
        </button>
        <button onClick={() => setSelectedCategory("laptops")}>Laptops</button>
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Cart</h2>
        {cart.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
