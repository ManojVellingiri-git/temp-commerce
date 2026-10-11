// Temporary fallback to mock data during migration phase
// Eventually all these methods will use axios/fetch to connect to backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

/**
 * Products API
 */
export const getProducts = async (queryString = '') => {
    try {
        const res = await fetch(`${API_URL}/products${queryString}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
    } catch (error) {
        console.error("API Error getProducts:", error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        return await res.json();
    } catch (error) {
        console.error("API Error getProductById:", error);
        throw error;
    }
};

/**
 * Categories API
 */
export const getCategories = async () => {
    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error('Failed to fetch categories');
        return await res.json();
    } catch (error) {
        console.error("API Error getCategories:", error);
        throw error;
    }
};

/**
 * Orders API
 */
export const createOrder = async (orderData) => {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!res.ok) throw new Error('Failed to create order');
        return await res.json();
    } catch (error) {
        console.error("API Error createOrder:", error);
        throw error;
    }
};

export const getOrders = async (token) => {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return await res.json();
    } catch (error) {
        console.error("API Error getOrders:", error);
        throw error;
    }
};

/**
 * Auth API
 */
export const loginAPI = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        return data.data;
    } catch (error) { throw error; }
};

export const registerAPI = async (userData) => {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Registration failed');
        return data.data;
    } catch (error) { throw error; }
};

export const getMeAPI = async (token) => {
    try {
        const res = await fetch(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
        return data.data;
    } catch (error) { throw error; }
};

/**
 * Payments API
 */
export const createPaymentOrder = async (checkoutData, token) => {
    try {
        const res = await fetch(`${API_URL}/payments/create-order`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(checkoutData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to create payment order');
        return data.data;
    } catch (error) { throw error; }
};

export const verifyPayment = async (verificationData, token) => {
    try {
        const res = await fetch(`${API_URL}/payments/verify`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(verificationData)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to verify payment');
        return data.data;
    } catch (error) { throw error; }
};

/**
 * Admin API
 */
export const getAllOrders = async (token) => {
    try {
        const res = await fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch all orders');
        return data.data;
    } catch (error) { throw error; }
};

export const updateOrderStatus = async (orderId, status, token) => {
    try {
        const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to update order status');
        return data.data;
    } catch (error) { throw error; }
};
