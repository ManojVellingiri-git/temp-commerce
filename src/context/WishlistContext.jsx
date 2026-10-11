import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const localData = localStorage.getItem('grocery_wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading wishlist from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('grocery_wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error writing wishlist to localStorage", error);
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.productId === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.productId !== product.id);
      } else {
        return [...prevWishlist, {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          rating: product.rating,
          reviews: product.reviews
        }];
      }
    });
  };
  
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.productId !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = {
    wishlist,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    clearWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
