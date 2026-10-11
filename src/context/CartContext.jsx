import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandConfig } from '../config/brandConfig';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('grocery_cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('grocery_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error writing cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: quantity,
          unit: product.unit || '1 pc'
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.productId !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const setQuantity = (productId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) return;
    setCart(prevCart => prevCart.map(item =>
      item.productId === productId
        ? { ...item, quantity: quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    // For now, let's just return 0 or calculate based on originalPrice if available
    return cart.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const calculateDeliveryFee = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= brandConfig.shipping.freeDeliveryThreshold ? 0 : brandConfig.shipping.deliveryFee;
  };

  const calculateTax = () => {
    // Example 5% tax on subtotal
    return calculateSubtotal() * 0.05;
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateDeliveryFee() + calculateTax();
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    clearCart,
    getCartCount,
    calculateSubtotal,
    calculateDiscount,
    calculateDeliveryFee,
    calculateTax,
    calculateGrandTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
