import React from 'react';

const StatusBadge = ({ status }) => {
    let color = 'secondary';
    
    switch(status.toLowerCase()) {
        case 'delivered':
        case 'active':
        case 'in stock':
            color = 'success';
            break;
        case 'pending':
        case 'processing':
            color = 'warning';
            break;
        case 'cancelled':
        case 'expired':
        case 'out of stock':
            color = 'danger';
            break;
        case 'shipped':
            color = 'info';
            break;
        case 'low stock':
            color = 'warning text-dark';
            break;
        default:
            color = 'secondary';
    }

    return (
        <span className={`badge bg-light-${color.split(' ')[0]} text-${color} px-2 py-1 rounded-pill`}>
            {status}
        </span>
    );
};

export default StatusBadge;
