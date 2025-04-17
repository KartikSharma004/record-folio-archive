import { useState, useEffect } from 'react';
import { Search, Plus, Menu, Bell, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useNavigate } from 'react-router-dom';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandGroup, 
  CommandItem, 
  CommandEmpty 
} from '@/components/ui/command';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const path = window.location.pathname;
      
      if (path.includes('documents')) {
        navigate('/documents', { state: { searchTerm: searchQuery } });
      } else if (path.includes('semesters')) {
        navigate('/semesters', { state: { searchTerm: searchQuery } });
      } else if (path.includes('achievements')) {
        navigate('/achievements', { state: { searchTerm: searchQuery } });
      } else {
        navigate('/documents', { state: { searchTerm: searchQuery } });
      }
      
      setOpen(false);
    }
  };

  const navigateToSearch = (path: string) => {
    if (searchQuery.trim()) {
      navigate(path, { state: { searchTerm: searchQuery } });
      setOpen(false);
    }
  };

  return (
    <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center lg:hidden">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-1 items-center max-w-md mx-4">
        <div className="relative w-full">
          <Button
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search records...</span>
            <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
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

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search records..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem 
              onSelect={() => navigateToSearch('/documents')}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>Search documents</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => navigateToSearch('/semesters')}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>Search semesters</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => navigateToSearch('/achievements')}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>Search achievements</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;
