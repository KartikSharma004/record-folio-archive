
import { Search, Plus, Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center lg:hidden">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-1 items-center max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records..."
            className="w-full pl-9 rounded-md bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <div className="text-sm font-medium mb-2">Notifications</div>
            <div className="text-xs text-muted-foreground">You have no new notifications</div>
          </PopoverContent>
        </Popover>
        
        <Button variant="default" size="sm" className="hidden sm:flex">
          <Plus className="h-4 w-4 mr-1" /> Add Record
        </Button>
      </div>
    </header>
  );
};

export default Header;
