import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/seller/Sidebar'; // Correct path
import ManageInventory from '../components/seller/ManageInventory';
import Header from '../components/seller/Header';
import DailySalesLineChart from '../components/seller/DailySalesLineChart';
import Earnings from '../components/seller/Earnings';
import MonthlyStatsBarChart from '../components/seller/MonthlyStatsBarChart';
import Ordersdetails from '../components/seller/Ordersdetails';

const DashboardWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #24263b;
`;

const SectionWrapper = styled.div`
  margin-bottom: 20px;
`;

const Dashboard = () => (
    <DashboardWrapper>
        <Sidebar />
        <ContentWrapper>
            <Header /> {/* Header section */}
            <SectionWrapper>
                <h2>Daily Sales</h2>
                <DailySalesLineChart /> {/* Chart showing daily sales */}
            </SectionWrapper>
            <SectionWrapper>
                <h2>Earnings</h2>
                <Earnings /> {/* Earnings component */}
            </SectionWrapper>
            <SectionWrapper>
                <h2>Monthly Stats</h2>
                <MonthlyStatsBarChart /> {/* Bar chart for monthly statistics */}
            </SectionWrapper>
            <SectionWrapper>
                <h2>Inventory Management</h2>
                <ManageInventory /> {/* Manage inventory component */}
            </SectionWrapper>
            <SectionWrapper>
                <h2>Latest Orders</h2>
                <Ordersdetails /> {/* Orders details component */}
            </SectionWrapper>
        </ContentWrapper>
    </DashboardWrapper>
);

export default Dashboard;
