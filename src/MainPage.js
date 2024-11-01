import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { DashBoard, Calendar,  Editor } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Hero from './pages/Website/Hero';
import WhatWeDo from './pages/Website/WhatWeDo';
import OurDifferences from './pages/Website/OurDifferences';
import OurProcess from './pages/Website/OurProcess';
import OurPortfolio from './pages/Website/OurPortfolio';
import OurClients from './pages/Website/OurClients';
import Testimonials from './pages/Website/Testimonials';
import Sales from './pages/Financials/Sales';
import Expenses from './pages/Financials/Expenses';
import Customers from './pages/UserMgmt/Customers';
import Employees from './pages/UserMgmt/Employees';
import InstantReply from './pages/Messages/InstantReply';
import FollowUp from './pages/Messages/FollowUp';
import MyProfile from './pages/Admin/MyProfile';
import Login from './pages/Homepage';
import Admin from './pages/UserMgmt/Admin';
import ClientApi from './pages/ClientApi';
import PriceConfiguration from './pages/Financials/PriceConfiguration';
import Visitors from './pages/Visitors';
import MainChat from './pages/MainChat';
import Roles from './pages/SystemOperations/Roles';
import RevokeRole from './pages/SystemOperations/RevokeRole';
import ViewRole from './pages/SystemOperations/ViewRole';
import Menu from './pages/Commerce/Menu';
import Category from './pages/Commerce/Category';
import Products from './pages/ProductManagement/Products';
import Inventory from './pages/ProductManagement/Inventory';
import Payment from './pages/BusinessOperation/Payment';
import BaggingDetails from './pages/BusinessOperation/BaggingDetails';
import Bagging from './pages/BusinessOperation/Bagging';
import Checking from './pages/BusinessOperation/Checking';
import CheckingDetails from './pages/BusinessOperation/CheckingDetails.jsx';
import Delivery from './pages/Delivery/Delivery.jsx';
import DeliveryDetails from './pages/Delivery/DeliveryDetails.jsx';
import DeliveryList from './pages/Delivery/DeliveryList.jsx';
import DeliveryListDetails from './pages/Delivery/DeliveryListDetails.jsx';
import CustomerDeliver from './pages/Delivery/CustomerDeliver.jsx';
import CustomerDeliverList from './pages/Delivery/CustomerDeliverList.jsx';
import AuditTrial from './pages/Security/AuditTrial.jsx';
import CustomerTrial from './pages/Security/CustomerTrial.jsx';
import ProductAssessment from './pages/Security/ProductAssessment.jsx';
import RateLimitCatcher from './pages/Security/RateLimitCatcher.jsx';
import WebConfiguration from './pages/SystemOperations/WebConfiguration.jsx';
import ProductImage from './pages/ProductManagement/ProductImage.jsx';
import Configurations from './pages/Master/Cnfigurations.jsx';
import PaymentOnDelivery from './pages/BusinessOperation/PaymentOnDelivery.jsx';
import ProtectedRoute from './components/ProtectedRoute.js';
import CreditSales from './pages/BusinessOperation/CreditSales.jsx';
import CreditSalesDetails from './pages/BusinessOperation/CreditSalesDetails.jsx';
import CollectionAccount from './pages/BusinessOperation/CollectionAccount.jsx';
import CollectionAccountHistory from './pages/BusinessOperation/CollectionAccountHistory.jsx';
import Discount from './pages/Delivery/Discount.jsx';
import Subscribe from './pages/Website/Subscribe.jsx';


const MainPage = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      try {
        // Intentional empty block
      } catch (err) {
        if (err.message === 'ResizeObserver loop completed with undelivered notifications.') {
          console.warn('ResizeObserver loop error detected.');
        } else {
          throw err;
        }
      }
    });

    observer.observe(document.body); // Assuming observing the body for changes

    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate()

  useEffect(() => {
    let activityTimer;
  
    const clearSessionAndNavigate = () => {
      sessionStorage.clear();
    navigate("/")

    };
  
    const resetTimer = () => {
      clearTimeout(activityTimer);
  
      activityTimer = setTimeout(clearSessionAndNavigate, 6000000); 
    };
  
    const resetTimerOnActivity = () => {
      if (activityTimer) {
        clearTimeout(activityTimer);
      }
      resetTimer();
    };
  
    // Initial setup and event listeners
    resetTimer();
    window.addEventListener('mousemove', resetTimerOnActivity);
    window.addEventListener('keypress', resetTimerOnActivity);
  
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', resetTimerOnActivity);
      window.removeEventListener('keypress', resetTimerOnActivity);
      clearTimeout(activityTimer);
    };
  }, [navigate]);


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      
      <div>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="DashBoard" element={(<DashBoard />)} />
                
                {/* System Operations  */}     
                <Route path="roles" element={(<Roles />)} />
                <Route path="revokeRoles" element={(<RevokeRole />)} />
                <Route path="viewRoles" element={(<ViewRole />)} />
                <Route path="shopSetup" element={(<WebConfiguration />)} />
                <Route path="configurations" element={(<Configurations />)} />

                {/* User Management  */}
                <Route path="customers" element={<Customers />} />
                <Route path="admin" element={<Admin />} />

                {/* Commerce */}
                <Route path="menu" element={<Menu/>} />
                <Route path="category" element={<Category/>} />

                 {/* Product Management */}
                 <Route path="product" element={<Products/>} />
                 <Route path="inventory" element={<Inventory/>} />
                 <Route path="product/:productId" element={<ProductImage/>} />

                {/* Business Operations */}
                  <Route path="payments" element={<Payment/>} />
                  <Route path="paymentOnDelivery" element={<PaymentOnDelivery/>} />

                  <Route path="creditSales" element={<CreditSales/>} />
                  <Route path="creditSales/:orderId/:referenceId" element={<CreditSalesDetails/>} />

                  <Route path="collectionAccount" element={<CollectionAccount/>} />
                  <Route path="collectionAccount/:accountID/" element={<CollectionAccountHistory/>} />

                  <Route path="discount" element={<Discount/>} />
                  <Route path="subscribe" element={<Subscribe/>} />


                  <Route path="bagging" element={<Bagging/>} />
                  <Route path="bagging/:orderId/:baggingId" element={<BaggingDetails/>} />

                  <Route path="checking" element={<Checking/>} />
                  <Route path="checking/:orderId/:checkingId" element={<CheckingDetails/>} />
                  
                   {/* Delivery */}
                  <Route path="assignDelivery" element={<Delivery/>} />
                  <Route path="delivery/:orderId/:deliveryId" element={<DeliveryDetails/>} />
                  <Route path="deliveryList" element={<DeliveryList/>} />
                  <Route path="deliveryList/:orderId/:deliveryId" element={<DeliveryListDetails/>} />

                  <Route path="customerDelivery" element={<CustomerDeliver/>} />
                  <Route path="customerDeliveryList/:orderId/:deliveryId" element={<CustomerDeliverList/>} />

                   {/* Security */}
                   <Route path="auditTrail" element={<AuditTrial/>} />
                   <Route path="customerTrail" element={<CustomerTrial/>} />
                   <Route path="productAssessment" element={<ProductAssessment/>} />
                   <Route path="rateLimit" element={<RateLimitCatcher/>} />

                 


                {/* MainPages  */}
              
                <Route path="calendar" element={<Calendar />} />
                <Route path="hero" element={<Hero />} />
                <Route path="WhatWeDo" element={<WhatWeDo />} />
                <Route path="OurDifferences" element={<OurDifferences />} />
                <Route path="OurProcess" element={<OurProcess />} />
                <Route path="OurPortfolio" element={<OurPortfolio />} />
                <Route path="OurClients" element={<OurClients />} />
                <Route path="Testimonials" element={<Testimonials />} />
                <Route path="sales" element={<Sales />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="instantReply/:Id" element={<InstantReply />} />
                <Route path="allMessages" element={<FollowUp />} />
                <Route path="myProfile" element={<MyProfile />} />
                <Route path="clientApi" element={<ClientApi />} />
                <Route path="priceConfiguration" element={<PriceConfiguration />} />
                <Route path="visitors" element={<Visitors />} />
                <Route path="mainChat" element={<MainChat />} />



                <Route path="*" element={<Navigate to="/" />} />
                

               
               
               

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainPage;
