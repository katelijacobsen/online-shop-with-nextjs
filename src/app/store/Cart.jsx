import { create } from "zustand";

const cartStore = create((set) => ({
  // create opretter vores zustand store. set er vores funktion til at update funktionens tilstand.
  // vores tilstand. Vi putter vores produkter ind i vores array.
  cart: [],
  // const [ visibleCart, setCartVisible] = useState(false);

  visible : false,
  
//  const toggleCart = () => {
    //   setCartVisible(!visibleCart);
    // }
  toggleVisible: () => set((state) => ({
    visible : !state.visible
  })),
  

  //const addToCart = (product) => {
  //setCart((prevCart) => [...prevCart, product]);
  //};

  // Her skrives hvordan vores events bliver behandlet.
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product], // tilføjer vores produkt i vores array.
    })),

  //   const removeFromCart = (productId) => {
  //     setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  //   };

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId), //anvenver filter metode.
    })),

  clearCart: () => set({ cart: [] }), // Gør vores kurv tom.
}));

export default cartStore;
