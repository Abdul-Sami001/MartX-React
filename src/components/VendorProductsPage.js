import React from 'react';
import { useParams } from 'react-router-dom';
import ProductListing from './ProductListing';
import Navbar from './Navbar';
import Footer from './Footer'
const VendorProductsPage = () => {
    const { vendorId } = useParams();  // Get vendor ID from the URL
    return (
        <>
            <Navbar />

            <ProductListing vendorId={vendorId} />

            <Footer />
        </>
    );  // Pass vendorId to ProductListing
};

export default VendorProductsPage;