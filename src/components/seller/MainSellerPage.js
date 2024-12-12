import React from "react";
import Sidebar from "./Sidebar";
import SellerDashboard from "./SellerDashboard";
import { Box } from "@chakra-ui/react";

const MainSellerPage = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar always visible on the left */}
      <Sidebar />

      {/* Seller Dashboard content displayed next to the sidebar */}
      <Box flex="1" p="4">
        <SellerDashboard />
      </Box>
    </Box>
  );
};

export default MainSellerPage;
