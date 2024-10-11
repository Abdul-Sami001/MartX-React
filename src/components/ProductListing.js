import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Image, Text, Button, Flex, Icon, Spinner, Input, Select } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';  // Custom hook for cart operations
import { useProducts } from '../hooks/useProducts';  // React Query hook to fetch products
import useCartStore from '../stores/cartStore';  // Zustand store for cart state
import { toast } from 'react-toastify';
import axios from 'axios';  // Axios for fetching vendor-specific products

function ProductListing({ vendorId }) {
    const { addToCartMutation } = useCart();  // Use cart operations from React Query and Zustand
    const navigate = useNavigate();  // For navigation
    const cartItems = useCartStore((state) => state.cartItems);  // Access current cart items from Zustand store
    const [vendorProducts, setVendorProducts] = useState([]);
    const [loadingVendorProducts, setLoadingVendorProducts] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [collectionId, setCollectionId] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products based on filters and sorting
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = {
                    search: searchTerm,
                    collection_id: collectionId,
                    unit_price__gt: minPrice,
                    unit_price__lt: maxPrice,
                    ordering: sortBy,
                };

                const { data } = await axios.get(`http://127.0.0.1:8000/store/products/`, { params });
                setProducts(data.results || []);  // Ensure results are fetched
            } catch (error) {
                setError('Failed to load products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [searchTerm, collectionId, minPrice, maxPrice, sortBy]);

    // Fetch vendor-specific products if vendorId is passed
    useEffect(() => {
        const fetchVendorProducts = async () => {
            if (vendorId) {
                try {
                    const { data } = await axios.get(`http://127.0.0.1:8000/store/vendors/${vendorId}/products/`);
                    setVendorProducts(data || []);  // Ensure results are fetched
                } catch (error) {
                    toast.error('Failed to load vendor products.');
                } finally {
                    setLoadingVendorProducts(false);
                }
            } else {
                setLoadingVendorProducts(false);  // No vendorId, skip vendor product loading
            }
        };

        fetchVendorProducts();
    }, [vendorId]);

    // Handle adding a product to the cart
    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.product.id === product.id);

        if (existingItem) {
            toast.info(`"${product.title}" is already in the cart!`);  // Show a toast notification
        } else {
            addToCartMutation.mutate({ productId: product.id }, {
                onSuccess: () => {
                    toast.success(`"${product.title}" has been added to your cart!`);  // Show success toast
                },
                onError: () => {
                    toast.error('Failed to add item to cart. Please try again.');  // Show error toast
                }
            });
        }
    };

    // Navigate to product detail page
    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Display loading spinner while fetching products
    if (loading || loadingVendorProducts) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    // Display error message if there's an error
    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text color="red.500">Failed to load products. Please try again later.</Text>
            </Box>
        );
    }

    // Handle product list for vendor or general products
    const productList = vendorId ? vendorProducts : products;

    // If no products are found
    if (!productList || productList.length === 0) {
        return <Text>No products available.</Text>;
    }

    // Render the product list (either vendor-specific or general featured products)
    return (
        <Box p={4} mt={8}>
            <Text fontSize="2xl" mb={4} fontWeight="bold">
                {vendorId ? 'Vendor Products' : 'Featured Products'}
            </Text>

            {/* Filters */}
            <Box mb={4}>
                <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    mb={2}
                />
                <Select placeholder="Select Collection" value={collectionId} onChange={(e) => setCollectionId(e.target.value)} mb={2}>
                    {/* Populate this with actual collection options */}
                    <option value="1">Flowers</option>
                    <option value="2">Grocery</option>
                    {/* Add more options dynamically based on available collections */}
                </Select>
                <Flex gap={2} mb={2}>
                    <Input
                        placeholder="Min Price"
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <Input
                        placeholder="Max Price"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Flex>
                <Select placeholder="Sort By" value={sortBy} onChange={(e) => setSortBy(e.target.value)} mb={4}>
                    <option value="unit_price">Price (Low to High)</option>
                    <option value="-unit_price">Price (High to Low)</option>
                    <option value="last_update">Newest</option>
                    <option value="-last_update">Oldest</option>
                </Select>
            </Box>

            <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
                {productList.map((product) => (
                    <Box
                        key={product.id}
                        p={4}
                        border="1px solid #e2e8f0"
                        borderRadius="md"
                        onClick={() => handleCardClick(product.id)}  // Navigate to product detail
                        _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
                        transition="transform 0.3s ease"
                    >
                        {/* Product Image */}
                        <Box
                            height="200px"
                            width="100%"
                            overflow="hidden"
                            mb={4}
                            borderRadius="md"
                            bg="gray.100"
                        >
                            {product.images && product.images.length > 0 ? (
                                <Image
                                    src={product.images[0].image}  // Display the first image
                                    alt={product.title}
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                    transition="transform 0.3s"
                                    _hover={{ transform: "scale(1.05)" }}
                                />
                            ) : (
                                <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                                    <Text>No Image Available</Text>
                                </Box>
                            )}
                        </Box>

                        {/* Product Title */}
                        <Text fontWeight="bold" mb={1} noOfLines={1} minHeight="24px">
                            {product.title}
                        </Text>

                        {/* Product Description */}
                        <Text fontSize="sm" color="gray.600" mb={2} noOfLines={3} minHeight="60px">
                            {product.description || ' '}
                        </Text>

                        {/* Product Rating */}
                        <Flex mb={4} minHeight="24px">
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    as={FaStar}
                                    color={i < product.average_rating ? "orange.400" : "gray.300"}
                                    boxSize={4}
                                />
                            ))}
                        </Flex>

                        {/* Product Price */}
                        <Text fontWeight="bold" fontSize="lg" mb={4} minHeight="24px">
                            {product.unit_price ? `Rs ${product.unit_price.toFixed(2)}` : 'N/A'}
                        </Text>

                        {/* Add to Cart Button */}
                        <Button
                            bgGradient="linear(to-b,  #132063, #0A0E23)"
                            color="white"
                            _hover={{ bgGradient: "linear(to-b,  orange.200, orange.600)", boxShadow: "md" }}
                            size="sm"
                            width="full"
                            onClick={(e) => {
                                e.stopPropagation();  // Prevent navigating to the product page
                                handleAddToCart(product);
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductListing;
