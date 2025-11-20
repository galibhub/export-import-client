import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import MyExportCard from './MyExportCard';

const MyExport = () => {
    const {user} = use(AuthContext);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    //-----//
    

    useEffect(() => {
        fetch(`http://localhost:3000/myExport?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
    }, [user])








    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-base-content/70">Loading your exports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-8 px-4">
    <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-base-content mb-2">My Exports</h1>
            <p className="text-base-content/70">Manage your export products</p>
        </div>

        {/* Add Export Button */}
        <div className="mb-6">
            <Link 
                to="/addExport"
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content font-medium rounded-lg transition-colors shadow-sm"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Export
            </Link>
        </div>

        {/* Table */}
        {product.length === 0 ? (
            <div className="text-center py-12 bg-base-100 rounded-lg shadow">
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-base-content mb-2">No exports yet</h3>
                <p className="text-base-content/70 mb-4">Start by adding your first export product</p>
                <Link 
                    to="/addExport"
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-content font-medium rounded-lg transition-colors"
                >
                    Add Your First Product
                </Link>
            </div>
        ) : (
            <div className="bg-base-100 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    {/* Table Header - Fixed for Export Products */}
                    <thead className="bg-primary text-primary-content">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">#</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">PRODUCT NAME</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">EXPORTER</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">COUNTRY</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">PRICE</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">RATING</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-base-300">
                        {product.map((product, index) => (
                            <MyExportCard 
                                key={product._id}
                                product={product}
                                index={index} 


                                
                                
                            />
                        ))}
                    </tbody>
                </table>

                {/* Table Footer */}
                <div className="bg-base-200 px-6 py-4 border-t border-base-300">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-base-content">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{product.length}</span> of{' '}
                            <span className="font-medium">{product.length}</span> results
                        </div>
                        <div className="text-sm text-base-content/70">
                            Total Products: <span className="font-medium">{product.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
</div>
    );
};

export default MyExport;