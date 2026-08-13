import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCart, addToCart as apiAddToCart, removeCartItem, updateCartItem } from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart on load (replaces PHP cart.php session logic)
  useEffect(() => {
    fetchCart();
  }, [token]);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCartItems(res.data.items || []);
      setCartCount(res.data.items?.length || 0);
    } catch (err) {
      setCartItems([]);
    }
  };

  // Add to cart (replaces add_to_cart.php)
  const addToCart = async (productId, quantity = 1) => {
    const res = await apiAddToCart({ productId, quantity });
    fetchCart();
    return res.data;
  };

  // Remove from cart (replaces manage_cart.php)
  const removeFromCart = async (itemId) => {
    await removeCartItem(itemId);
    fetchCart();
  };

  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    await updateCartItem(itemId, { quantity });
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
