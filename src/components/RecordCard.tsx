
import { Link } from 'react-router-dom';
import { Calendar, FileText, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface RecordCardProps {
  id: string;
  title: string;
  description?: string;
  type: 'semester' | 'document' | 'achievement';
  date?: string;
  icon?: React.ReactNode;
  className?: string;
}

const RecordCard: React.FC<RecordCardProps> = ({
  id,
  title,
  description,
  type,
  date,
  icon,
  className
}) => {
  const getIcon = () => {
    if (icon) return icon;
    return <FileText className="h-5 w-5" />;
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'semester': return 'Semester';
      case 'document': return 'Document';
      case 'achievement': return 'Achievement';
      default: return 'Record';
    }
  };

  return (
    <Card className={cn("record-card overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start space-y-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium leading-none">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{getTypeLabel()}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      {description && (
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground truncate-2">{description}</p>
        </CardContent>
      )}
      
      <CardFooter className="p-4 pt-2 flex justify-between">
        {date && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
        )}
        <Button asChild size="sm" variant="ghost">
          <Link to={`/record/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecordCard;
