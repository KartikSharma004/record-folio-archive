
import { useState } from 'react';
import { BookOpenCheck, Filter, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RecordCard from '@/components/RecordCard';

const SemesterRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Sample data - in a real app, this would come from your API
  const semesters = [
    {
      id: 'sem-1',
      title: 'Spring 2023',
      description: 'Completed with 3.8 GPA. Courses included Advanced Database Systems, Web Development, and Machine Learning.',
      type: 'semester' as const,
      date: '2023-05-15',
    },
    {
      id: 'sem-2',
      title: 'Fall 2022',
      description: 'Completed with 3.6 GPA. Courses included Data Structures, Algorithms, and Computer Networks.',
      type: 'semester' as const,
      date: '2022-12-20',
    },
    {
      id: 'sem-3',
      title: 'Spring 2022',
      description: 'Completed with 3.7 GPA. Courses included Introduction to Programming, Digital Logic, and Mathematics.',
      type: 'semester' as const,
      date: '2022-05-18',
    },
    {
      id: 'sem-4',
      title: 'Fall 2021',
      description: 'Completed with 3.5 GPA. Courses included Computer Organization, Discrete Mathematics, and Physics.',
      type: 'semester' as const,
      date: '2021-12-15',
    },
    {
      id: 'sem-5',
      title: 'Spring 2021',
      description: 'Completed with 3.9 GPA. Courses included Introduction to Computer Science, Calculus, and Technical Writing.',
      type: 'semester' as const,
      date: '2021-05-20',
    },
    {
      id: 'sem-6',
      title: 'Fall 2020',
      description: 'Completed with 3.7 GPA. Courses included English Composition, Introduction to College, and General Psychology.',
      type: 'semester' as const,
      date: '2020-12-18',
    }
  ];

  const filteredSemesters = semesters
    .filter(semester => 
      semester.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      semester.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Semester Records</h1>
          <p className="text-muted-foreground mt-1">Manage your academic semester records and course information.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Semester
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search semesters..."
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
        {filteredSemesters.length > 0 ? (
          filteredSemesters.map(semester => (
            <RecordCard
              key={semester.id}
              id={semester.id}
              title={semester.title}
              description={semester.description}
              type={semester.type}
              date={semester.date}
              icon={<BookOpenCheck className="h-5 w-5" />}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <BookOpenCheck className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No semesters found</h3>
            <p className="text-muted-foreground">Try adjusting your search or add a new semester record.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterRecords;
