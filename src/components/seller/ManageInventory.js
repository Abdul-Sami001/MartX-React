import React, { useState, useEffect } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton, Button } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { getProducts, createProduct, deleteProduct, updateProduct } from '../../services/productService';
import AddProductModal from './AddProductModal'; 
import { useDisclosure } from '@chakra-ui/react';

const ManageInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    slug: '',
    inventory: null,
    unit_price: null,
    collection: null,
    image: null,
  });
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch data including pagination info
  const fetchData = async (url = null) => {
    try {
      const products = await getProducts(url);
      setInventoryItems(products.results);
      setNextPage(products.next);
      setPreviousPage(products.previous);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    async function fetchData(url = 'http://127.0.0.1:8000/store/products') { // Set the default URL
      try {
        const products = await getProducts(url); // Pass the URL to the function
        setInventoryItems(products.results);
        setNextPage(products.next); // Set the next page URL
        setPreviousPage(products.previous); // Set the previous page URL
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  
    fetchData();
  }, []);
  

  useEffect(() => {
    async function fetchCollections() {
      const response = await fetch('http://127.0.0.1:8000/store/collections');
      const data = await response.json();
      setCollections(data);
    }
    fetchCollections();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    if (editingProductId) {
      await updateProduct(editingProductId, newProduct);
    } else {
      const addedProduct = await createProduct(newProduct);
      setInventoryItems([...inventoryItems, addedProduct]);
    }

    setNewProduct({
      title: '',
      description: '',
      slug: '',
      inventory: null,
      unit_price: null,
      collection: null,
      image: null,
    });
    setEditingProductId(null);
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewProduct({
      ...newProduct,
      image: file,
    });
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      title: product.title,
      description: product.description,
      slug: product.slug,
      inventory: product.inventory,
      unit_price: product.unit_price,
      collection: product.collection,
      image: product.image,
    });
    setEditingProductId(product.id);
    onOpen();
  };

  const handleDeleteProduct = async (id) => {
    const isDeleted = await deleteProduct(id);
    if (isDeleted) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchData(nextPage); // Fetch data for the next page
    }
  };
  
  const handlePreviousPage = () => {
    if (previousPage) {
      fetchData(previousPage); // Fetch data for the previous page
    }
  };
  

  return (
    <Box 
      p="20px" 
      bg="#0A0E23" 
      color="white" 
      border="2px" 
      boxShadow="md" 
      mt="0px" 
      borderRadius="lg"
    >
      <Heading mb="20px" color="#F47D31">Manage Inventory</Heading>

      {/* Add Product Button */}
      <Box display="flex" justifyContent="flex-end" mb="10px">
        <IconButton 
          icon={<AddIcon />} 
          colorScheme="orange" 
          onClick={onOpen} 
          aria-label="Add new product" 
        />
      </Box>

      {/* Inventory Table */}
      <Table 
        variant="simple" 
        bg="white" 
        color="black" 
        borderRadius="lg" 
        mb="20px" 
        size="sm"
      >
        <Thead bg="#F47D31">
          <Tr>
            <Th color="white" px="10px" py="8px">Product Name</Th>
            <Th color="white" px="10px" py="8px">Status</Th>
            <Th color="white" px="10px" py="8px">Quantity</Th>
            <Th color="white" px="10px" py="8px">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventoryItems.map(item => (
            <Tr key={item.id}>
              <Td px="10px" py="8px">{item?.title}</Td>
              <Td px="10px" py="8px">{item.inventory > 0 ? 'In Stock' : 'Out of Stock'}</Td>
              <Td px="10px" py="8px">{item.inventory}</Td>
              <Td px="10px" py="8px">
                <IconButton
                  icon={<EditIcon />}
                  backgroundColor="#0A0E23"
                  _hover={{ backgroundColor: "#0F1333" }}
                  color="white"
                  mr="2"
                  onClick={() => handleEditProduct(item)}
                  aria-label="Edit Product"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  backgroundColor="#F47D31"
                  _hover={{ backgroundColor: "#FF8B4C" }}
                  color="white"
                  onClick={() => handleDeleteProduct(item.id)}
                  aria-label="Delete Product"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination Buttons */}
      <Box display="flex" justifyContent="space-between" mt="20px">
        <Button
          onClick={handlePreviousPage}
          disabled={!previousPage}
          colorScheme="orange"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={!nextPage}
          colorScheme="orange"
        >
          Next
        </Button>
      </Box>

      {/* Add or Update Product Modal */}
      <AddProductModal
        isOpen={isOpen}
        onClose={onClose}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        handleImageUpload={handleImageUpload}
        collections={collections}
        editingProductId={editingProductId}
      />
    </Box>
  );
};

export default ManageInventory;
