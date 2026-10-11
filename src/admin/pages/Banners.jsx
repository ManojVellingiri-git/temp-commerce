import React from 'react';
import StatusBadge from '../components/StatusBadge';
import { mockBanners } from '../data/mockAdminData';

const Banners = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Banners</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>Add Banner
                </button>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Preview</th>
                                <th>Title & Subtitle</th>
                                <th>CTA</th>
                                <th>Validity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockBanners.map(banner => (
                                <tr key={banner.id}>
                                    <td>
                                        <div className="bg-light rounded d-flex align-items-center justify-content-center text-muted" style={{width: '120px', height: '60px'}}>
                                            <i className="bi bi-image fs-4"></i>
                                        </div>
                                    </td>
                                    <td>
                                        <h6 className="mb-1">{banner.title}</h6>
                                        <span className="text-muted small">{banner.subtitle}</span>
                                    </td>
                                    <td>
                                        <a href={banner.ctaLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary">
                                            {banner.ctaText}
                                        </a>
                                    </td>
                                    <td>
                                        <div className="small">
                                            <div>{banner.startDate}</div>
                                            <div className="text-muted">to {banner.endDate}</div>
                                        </div>
                                    </td>
                                    <td><StatusBadge status={banner.status} /></td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-light text-primary" title="Edit">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-light text-danger" title="Delete">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Banners;
