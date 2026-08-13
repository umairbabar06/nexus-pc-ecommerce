import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getWishlistIds,
  addToWishlist as apiAdd,
  removeFromWishlist as apiRemove,
  clearWishlist as apiClear,
} from '../api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load just the IDs on mount / login (lightweight endpoint)
  const fetchIds = useCallback(async () => {
    if (!token) {
      setWishlistIds(new Set());
      setWishlistCount(0);
      return;
    }
    try {
      const res = await getWishlistIds();
      const ids = res.data.ids || [];
      setWishlistIds(new Set(ids));
      setWishlistCount(ids.length);
    } catch (err) {
      console.error('WishlistContext fetchIds error:', err.response?.status, err.response?.data, err.message);
      setWishlistIds(new Set());
    }
  }, [token]);

  useEffect(() => { fetchIds(); }, [fetchIds]);

  // Toggle: add if not in wishlist, remove if already in
  const toggleWishlist = async (productId) => {
    if (!token) return false; // caller should redirect to login
    const inList = wishlistIds.has(productId);
    try {
      if (inList) {
        await apiRemove(productId);
        setWishlistIds(prev => { const s = new Set(prev); s.delete(productId); return s; });
        setWishlistCount(c => c - 1);
      } else {
        await apiAdd(productId);
        setWishlistIds(prev => new Set([...prev, productId]));
        setWishlistCount(c => c + 1);
      }
      return !inList; // true = now in wishlist
    } catch (err) {
      throw err; // let caller handle the error toast
    }
  };

  const isInWishlist = (productId) => wishlistIds.has(productId);

  const clearAll = async () => {
    await apiClear();
    setWishlistIds(new Set());
    setWishlistCount(0);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistIds, wishlistCount,
      toggleWishlist, isInWishlist,
      clearAll, fetchIds,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
