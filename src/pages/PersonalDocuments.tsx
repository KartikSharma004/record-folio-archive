
import { useState } from 'react';
import { FileText, Filter, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecordCard from '@/components/RecordCard';

const PersonalDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [activeTab, setActiveTab] = useState('all');

  // Sample data - in a real app, this would come from your API
  const documents = [
    {
      id: 'doc-1',
      title: 'Passport',
      description: 'Valid until 2028. Document number: AB123456.',
      type: 'document' as const,
      category: 'identification',
      date: '2023-02-10',
    },
    {
      id: 'doc-2',
      title: 'Driver\'s License',
      description: 'Valid until 2026. License number: DL789012.',
      type: 'document' as const,
      category: 'identification',
      date: '2022-05-15',
    },
    {
      id: 'doc-3',
      title: 'Birth Certificate',
      description: 'Official birth certificate issued by the government.',
      type: 'document' as const,
      category: 'identification',
      date: '2020-01-05',
    },
    {
      id: 'doc-4',
      title: 'Health Insurance',
      description: 'Health insurance policy documents and coverage information.',
      type: 'document' as const,
      category: 'insurance',
      date: '2023-01-01',
    },
    {
      id: 'doc-5',
      title: 'Car Insurance',
      description: 'Vehicle insurance policy for Toyota Camry.',
      type: 'document' as const,
      category: 'insurance',
      date: '2022-11-15',
    },
    {
      id: 'doc-6',
      title: 'Resume',
      description: 'Updated professional resume with recent work experiences and skills.',
      type: 'document' as const,
      category: 'career',
      date: '2023-03-20',
    },
    {
      id: 'doc-7',
      title: 'Cover Letter Template',
      description: 'Customizable cover letter template for job applications.',
      type: 'document' as const,
      category: 'career',
      date: '2023-03-22',
    },
    {
      id: 'doc-8',
      title: 'Rental Agreement',
      description: 'Current apartment lease agreement valid until December 2023.',
      type: 'document' as const,
      category: 'housing',
      date: '2022-12-01',
    }
  ];

  const filteredDocuments = documents
    .filter(document => 
      activeTab === 'all' || document.category === activeTab
    )
    .filter(document => 
      document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'identification', name: 'Identification' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'career', name: 'Career' },
    { id: 'housing', name: 'Housing' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Personal Documents</h1>
          <p className="text-muted-foreground mt-1">Store and manage your important personal documents securely.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-full overflow-auto justify-start mb-4">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map(document => (
            <RecordCard
              key={document.id}
              id={document.id}
              title={document.title}
              description={document.description}
              type={document.type}
              date={document.date}
              icon={<FileText className="h-5 w-5" />}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No documents found</h3>
            <p className="text-muted-foreground">Try adjusting your search or add a new document.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDocuments;
