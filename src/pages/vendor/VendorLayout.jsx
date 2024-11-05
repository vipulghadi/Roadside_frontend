import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, UtensilsCrossed, Settings, LogOut, MessageCircle, Menu,BellIcon } from "lucide-react";
import VendorSettings from "./VendorSettings";
import VendorItemListing from "./VendorItemLising";
import VendorHome from "./VendorHome";
import VendorContactUs from "./VendorContactUs";
import VendorNotifications from "./VendorNotifications";

const VendorLayout = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarTabs = {
    home: { label: "Home", icon: Home },
    food_item: { label: "Food Items", icon: UtensilsCrossed },
    settings: { label: "Settings", icon: Settings },
    contact_us: { label: "Contact Us", icon: MessageCircle },
    notifications:{label:"Notifications",icon:BellIcon}
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'home':
        return <VendorHome/>;
      case 'Notifications':
        return <VendorNotifications/>;
      case 'food_item':
        return <VendorItemListing />;
      case 'settings':
        return <VendorSettings />;
      case 'contact_us':
        return <VendorContactUs />;
      default:
        return <VendorNotifications/>;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 min-h-screen p-4 ${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block transition-all duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Vendor Dashboard</h2>
        <nav>
          {Object.entries(sidebarTabs).map(([key, tab]) => (
            <div
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`flex items-center px-4 py-2 mt-2 text-gray-100 rounded-lg hover:bg-gray-700 cursor-pointer ${
                selectedTab === key ? 'bg-gray-700' : ''
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4">
          <Link
            to="/logout"
            className="flex items-center px-4 py-2 text-gray-100 rounded-lg hover:bg-gray-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">
            {sidebarTabs[selectedTab].label}
          </h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default VendorLayout