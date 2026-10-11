import React from 'react';
import ProductForm from '../components/ProductForm';

const ProductCreate = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Add New Product</h2>
            </div>
            <ProductForm isEdit={false} />
        </div>
    );
};

export default ProductCreate;
