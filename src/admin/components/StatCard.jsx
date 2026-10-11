import React from 'react';

const StatCard = ({ title, value, icon, color, trend }) => {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h6 className="text-muted mb-1">{title}</h6>
                        <h3 className="mb-0 fw-bold">{value}</h3>
                    </div>
                    <div className={`icon-shape icon-md bg-light-${color} text-${color} rounded-3`}>
                        <i className={`bi ${icon} fs-4`}></i>
                    </div>
                </div>
                {trend && (
                    <div className="mt-2 text-sm">
                        <span className={`text-${trend > 0 ? 'success' : 'danger'} fw-bold me-2`}>
                            <i className={`bi bi-arrow-${trend > 0 ? 'up' : 'down'} me-1`}></i>
                            {Math.abs(trend)}%
                        </span>
                        <span className="text-muted">Since last month</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
