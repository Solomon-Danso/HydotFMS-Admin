import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';

import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Homepage';
import VerifyPage from './pages/VerifyPage';
import MainPage from './MainPage';
import ForgetPasswordStep1 from './pages/ForgetPasswordStep1';
import ForgetPasswordStep2 from './pages/ForgetPasswordStep2';
import Subscribe from './pages/Website/Subscribe';

const App = () => {
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



  return (

    <Router>
    <Routes>
   
    <Route path="/" element={<Login/>}/>

    <Route path="/main/*" element={<MainPage/>}/>
    <Route path="/verify" element={<VerifyPage />} />
    <Route path="/forget-password-step-1" element={<ForgetPasswordStep1 />} />
    <Route path="/forget-password-step-2" element={<ForgetPasswordStep2 />} />
    <Route path="/subscribe" element={<Subscribe />} />
    
   

    <Route path="*" element={<Navigate to="/" />} />


    </Routes>
    </Router>


  );
};

export default App;
