
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { TooltipProvider } from "@/components/ui/tooltip";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-6xl animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
