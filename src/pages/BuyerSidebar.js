import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  VStack,
  Text,
  HStack,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { AiOutlineFire, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHome } from 'react-icons/ai'; // Added Home Icon
import { FiTrendingUp, FiPackage, FiStar, FiBell, FiLogIn, FiMail, FiPhone } from 'react-icons/fi'; // Icons for various fields

const BuyerSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false);

  // Toggle categories dropdown
  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);
  const toggleSeeAll = () => setIsSeeAllOpen(!isSeeAllOpen);
  const navigate = useNavigate();

  return (
    <>
      {/* Icon to open the sidebar */}
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        color="black"
        bg={'white'}
        position={'absolute'}
        top="20px"
        left="20px"
        zIndex="1000"
      />

      {/* Sidebar Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="white" color="black"> {/* Sidebar background white */}
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor="#000000"> {/* Header with orange bottom border */}
            Menu
          </DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing={3}>
              {/* Home Option */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2} onClick={() => navigate('/dashboard')}>
                <AiOutlineHome /> {/* Home Icon */}
                <Text>Home</Text>
              </HStack>

              {/* Latest Products with Fire Icon */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2} onClick={() => navigate('/products', { state: { preSelectSort: 'last_update' } })} >// Pass state for pre-selection
                <AiOutlineFire /> {/* Fire Icon */}
                <Text>Latest Products</Text>
              </HStack>
              <Box w="full" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.3)" /> {/* Light line below Latest Products */}

              {/* Shop by Categories */}
              <HStack
                onClick={toggleCategories}
                _hover={{ color: '#F47D31' }}
                cursor="pointer"
                justify="space-between"
                w="full"
              >
                <HStack>
                  <AiOutlineShoppingCart /> {/* Shopping Cart Icon */}
                  <Text>Shop by Categories</Text>
                </HStack>
                {isCategoriesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </HStack>
              <Collapse in={isCategoriesOpen}>
                <VStack align="start" pl={4}>
                  <Text _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={1}>
                    Electronics
                  </Text>
                  <Text _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={1}>
                    Fashion
                  </Text>
                  <Text _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={1}>
                    Home Appliances
                  </Text>
                  {/* See All with down arrow */}
                  <HStack
                    onClick={toggleSeeAll}
                    _hover={{ color: '#F47D31' }}
                    cursor="pointer"
                    w="full" py={1}
                  >
                    <Text>See All</Text>
                    {isSeeAllOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </HStack>
                  <Collapse in={isSeeAllOpen}>
                    <VStack align="start" pl={4}>
                      <Text _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={1}>
                        Beauty
                      </Text>
                      <Text _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={1}>
                        Sports
                      </Text>
                    </VStack>
                  </Collapse>
                </VStack>
              </Collapse>
              <Box w="full" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.3)" /> {/* Line below See All */}

              {/* Top Sellers */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2} onClick={()=> navigate('/vendors') } >
                <FiTrendingUp /> {/* Trending Icon */}
                <Text>Sellers</Text>
              </HStack>

              {/* Track Order */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2} onClick={()=> navigate('/order-history')} >
                <FiPackage /> {/* Package Icon */}
                <Text>Track Order</Text>
              </HStack>

              {/* Ratings & Reviews */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2}>
                <FiStar /> {/* Star Icon */}
                <Text>Ratings & Reviews</Text>
              </HStack>

              {/* Notifications & Updates */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2}>
                <FiBell /> {/* Bell Icon */}
                <Text>Notifications & Updates</Text>
              </HStack>

              {/* My Account */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2} onClick={() => navigate('/profile')}>
                <AiOutlineUser /> {/* User Icon */}
                <Text>My Account</Text>
              </HStack>

              {/* Customer Service */}
              <Box w="full" borderBottom="1px" borderColor="rgba(0, 0, 0, 0.3)" /> {/* Line above Customer Service */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2}>
                <FiPhone /> {/* Phone Icon */}
                <Text>Customer Service: 123-456-7890</Text>
              </HStack>
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer" w="full" py={2}>
                <FiMail /> {/* Mail Icon */}
                <Text>Email: support@example.com</Text>
              </HStack>

              {/* Login/Logout Button */}
              <HStack _hover={{ color: '#F47D31' }} cursor="pointer"  py={2} justify="space-between">
                <FiLogIn /> {/* Login Icon */}
                <Text>Login/Logout</Text>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BuyerSidebar;
