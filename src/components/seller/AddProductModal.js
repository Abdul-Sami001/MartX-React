// src/components/inventory/AddProductModal.js
import React from 'react';
import { 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
  Input, Select, Button
} from '@chakra-ui/react';

const AddProductModal = ({
  isOpen,
  onClose,
  newProduct,
  handleInputChange,
  handleAddProduct,
  handleImageUpload,
  collections,
  editingProductId
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#0A0E23" color="white">
        <ModalHeader>{editingProductId ? 'Update Product' : 'Add New Product'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="title"
            placeholder="Product Name"
            value={newProduct.title}
            onChange={handleInputChange}
            mb="10px"
            bg="white"
            color="black"
          />
          <Input
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            mb="10px"
            bg="white"
            color="black"
          />
          <Input
            name="slug"
            placeholder="Slug"
            value={newProduct.slug}
            onChange={handleInputChange}
            mb="10px"
            bg="white"
            color="black"
          />
          <Input
            name="unit_price"
            placeholder="Price"
            value={newProduct.unit_price}
            onChange={handleInputChange}
            mb="10px"
            bg="white"
            color="black"
          />
          <Input
            name="inventory"
            placeholder="Quantity"
            value={newProduct.inventory}
            onChange={handleInputChange}
            mb="10px"
            bg="white"
            color="black"
          />
          <Select
            name="collection"
            placeholder="Select Collection"
            value={newProduct.collection}
            onChange={handleInputChange}
            mb="10px"
            bg="white"
            color="black"
          >
            {collections.map(collection => (
              <option key={collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </Select>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            mb="10px"
            bg="white"
            color="black"
          />
        </ModalBody>
        <ModalFooter>
          <Button 
            onClick={handleAddProduct} 
            bg="#F47D31" 
            color="white" 
            _hover={{ bg: '#0A0E23', color: '#F47D31', border: '2px solid #F47D31' }}
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
