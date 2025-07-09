import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 pb-20 md:pb-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;