import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiMessageCircle, FiUsers, FiList, FiFileText, FiSettings } = FiIcons;

const navItems = [
  { path: '/', icon: FiHome, label: 'Home' },
  { path: '/chat', icon: FiMessageCircle, label: 'Chat' },
  { path: '/agents', icon: FiUsers, label: 'Agents' },
  { path: '/tasks', icon: FiList, label: 'Tasks' },
  { path: '/logs', icon: FiFileText, label: 'Logs' },
  { path: '/settings', icon: FiSettings, label: 'Settings' },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 relative ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <SafeIcon icon={item.icon} className="w-5 h-5 relative z-10" />
                <span className="text-xs mt-1 relative z-10">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;