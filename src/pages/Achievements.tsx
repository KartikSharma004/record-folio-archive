
import { useState } from 'react';
import { Award, Filter, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RecordCard from '@/components/RecordCard';

const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  // Sample data - in a real app, this would come from your API
  const achievements = [
    {
      id: 'ach-1',
      title: 'Web Design Competition',
      description: 'First place in the national web design hackathon.',
      type: 'achievement' as const,
      date: '2023-03-22',
    },
    {
      id: 'ach-2',
      title: 'Dean\'s List',
      description: 'Recognized on the Dean\'s List for academic excellence for Fall 2022 semester.',
      type: 'achievement' as const,
      date: '2022-12-15',
    },
    {
      id: 'ach-3',
      title: 'Coding Hackathon',
      description: 'Second place in the 24-hour coding challenge organized by Tech Innovators.',
      type: 'achievement' as const,
      date: '2022-11-05',
    },
    {
      id: 'ach-4',
      title: 'Leadership Award',
      description: 'Received the Student Leadership Award for contributions to the Computer Science Club.',
      type: 'achievement' as const,
      date: '2022-05-28',
    },
    {
      id: 'ach-5',
      title: 'Research Publication',
      description: 'Co-authored a research paper on machine learning applications in healthcare.',
      type: 'achievement' as const,
      date: '2022-08-12',
    },
    {
      id: 'ach-6',
      title: 'Math Olympiad',
      description: 'Honorable mention at the State Mathematics Olympiad.',
      type: 'achievement' as const,
      date: '2021-11-20',
    },
    {
      id: 'ach-7',
      title: 'Scholarship',
      description: 'Awarded merit-based scholarship for academic excellence.',
      type: 'achievement' as const,
      date: '2021-08-05',
    },
    {
      id: 'ach-8',
      title: 'Debate Competition',
      description: 'First place in the inter-university debate competition on technology ethics.',
      type: 'achievement' as const,
      date: '2021-04-15',
    }
  ];

  const filteredAchievements = achievements
    .filter(achievement => 
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground mt-1">Showcase and track your accomplishments, awards, and certifications.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search achievements..."
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
        {filteredAchievements.length > 0 ? (
          filteredAchievements.map(achievement => (
            <RecordCard
              key={achievement.id}
              id={achievement.id}
              title={achievement.title}
              description={achievement.description}
              type={achievement.type}
              date={achievement.date}
              icon={<Award className="h-5 w-5" />}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <Award className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No achievements found</h3>
            <p className="text-muted-foreground">Try adjusting your search or add a new achievement record.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
