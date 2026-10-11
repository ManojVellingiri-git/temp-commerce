import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const ProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Mock fetch product
        const savedProducts = localStorage.getItem('admin_mock_products');
        if (savedProducts) {
            const products = JSON.parse(savedProducts);
            const found = products.find(p => p.id.toString() === id.toString());
            if (found) {
                setProduct(found);
            } else {
                navigate('/admin/products');
            }
        } else {
            navigate('/admin/products');
        }
    }, [id, navigate]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Edit Product</h2>
            </div>
            {product ? <ProductForm isEdit={true} initialData={product} /> : <p>Loading...</p>}
        </div>
    );
};

export default ProductEdit;
