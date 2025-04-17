
import { Link, useLocation } from 'react-router-dom';
import { Archive, BookOpenCheck, FileText, Award, LayoutDashboard, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Semester Records',
      path: '/semesters',
      icon: <BookOpenCheck className="w-5 h-5" />
    },
    {
      name: 'Personal Documents',
      path: '/documents',
      icon: <FileText className="w-5 h-5" />
    },
    {
      name: 'Achievements',
      path: '/achievements',
      icon: <Award className="w-5 h-5" />
    }
  ];
  
  return (
    <div 
      className={cn(
        "bg-sidebar fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-[70px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
          <Archive className="h-6 w-6 text-primary" />
          {isOpen && <span className="ml-2 font-bold text-white text-lg">RecordVault</span>}
        </div>
        {isOpen && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.path 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !isOpen && "justify-center"
                )}
              >
                {item.icon}
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        {isOpen ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-sidebar-foreground">User</p>
              <p className="text-xs text-sidebar-foreground/70">user@example.com</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
              U
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
