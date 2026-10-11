export const mockStats = {
    totalSales: 45231.89,
    totalOrders: 1245,
    totalProducts: 142,
    totalCustomers: 892,
    pendingOrders: 12,
    lowStockProducts: 5
};

export const mockOrders = [
    { id: 'ORD-001', customer: 'Alice Smith', date: '2023-10-25', items: 4, amount: 120.50, payment: 'Credit Card', status: 'Delivered' },
    { id: 'ORD-002', customer: 'Bob Johnson', date: '2023-10-26', items: 2, amount: 45.00, payment: 'PayPal', status: 'Processing' },
    { id: 'ORD-003', customer: 'Charlie Brown', date: '2023-10-26', items: 10, amount: 350.25, payment: 'Debit Card', status: 'Pending' },
    { id: 'ORD-004', customer: 'Diana Prince', date: '2023-10-27', items: 1, amount: 15.99, payment: 'Cash on Delivery', status: 'Shipped' },
    { id: 'ORD-005', customer: 'Evan Wright', date: '2023-10-27', items: 5, amount: 89.99, payment: 'Credit Card', status: 'Cancelled' },
];

export const mockCustomers = [
    { id: 'CUST-001', name: 'Alice Smith', email: 'alice@example.com', phone: '555-0101', orders: 12, spent: 1450.00, lastOrder: '2023-10-25', status: 'Active' },
    { id: 'CUST-002', name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0102', orders: 3, spent: 210.00, lastOrder: '2023-10-26', status: 'Active' },
    { id: 'CUST-003', name: 'Charlie Brown', email: 'charlie@example.com', phone: '555-0103', orders: 1, spent: 350.25, lastOrder: '2023-10-26', status: 'Inactive' },
];

export const mockCoupons = [
    { id: 'CPN-001', code: 'WELCOME10', type: 'Percentage', amount: 10, minOrder: 499, maxDiscount: 100, startDate: '2023-01-01', endDate: '2023-12-31', usageLimit: 1000, status: 'Active' },
    { id: 'CPN-002', code: 'FLAT50', type: 'Fixed', amount: 50, minOrder: 999, maxDiscount: 50, startDate: '2023-10-01', endDate: '2023-10-31', usageLimit: 500, status: 'Expired' },
];

export const mockBanners = [
    { id: 'BAN-001', title: 'Fresh Summer Sale', subtitle: 'Up to 50% off on fruits', image: '/images/banner1.jpg', ctaText: 'Shop Now', ctaLink: '/category/fruits', startDate: '2023-06-01', endDate: '2023-08-31', status: 'Active' },
    { id: 'BAN-002', title: 'Organic Dairy', subtitle: 'Farm fresh milk and cheese', image: '/images/banner2.jpg', ctaText: 'Explore', ctaLink: '/category/dairy', startDate: '2023-09-01', endDate: '2023-11-30', status: 'Active' },
];

export const mockSalesChart = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Revenue',
            data: [1200, 1900, 3000, 5000, 2400, 3200, 4100],
            borderColor: '#16A34A',
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            tension: 0.4,
            fill: true
        }
    ]
};
