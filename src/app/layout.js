"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Cart from "@/app/store/Cart"
import ShoppingCart from "@/components/ShoppingCart";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 40,
    delay: 5,
    ease: "easeInOut",
    type: "spring",
    stiffness: 400,
    damping: 10,
  },
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const { cart, toggleVisible, visible, removeFromCart } = Cart();

  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 dark:text-white`}
      >
        <Header />
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          {children}
        </motion.div> 
        <Footer />
        {visible && (
          <div className="fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={toggleVisible}
            ></div>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-0 right-0 w-full max-w-sm h-full bg-white dark:bg-gray-800 shadow-lg"
            >
              <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
            </motion.div>
          </div>
        )}
      </body>
    </html>
  );
}
