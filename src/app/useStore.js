//========================//
//                        //
// Global State Management//
//                        //
//========================//

const useStore = create((set) => ({
    products: [],
    filteredProducts: [],
    selectedCategory: "",
    search: "",
    cart: [],
    setProducts: (products) => set({ products, filteredProducts: products }),
    setSelectedCategory: (category) => set((state) => {
      const updatedProducts = state.products.filter(
        (product) => !category || product.category === category
      );
      return { selectedCategory: category, filteredProducts: updatedProducts };
    }),
    setSearch: (searchTerm) => set((state) => {
      const updatedProducts = state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { search: searchTerm, filteredProducts: updatedProducts };
    }),
    addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
    removeFromCart: (productId) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId),
      })),
  }));
  