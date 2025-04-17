
import { useNavigate } from 'react-router-dom';
import { PlusCircle, BookOpenCheck, FileText, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import RecordCard from '@/components/RecordCard';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data - in a real app, this would come from your API
  const recentRecords = [
    {
      id: 'sem-1',
      title: 'Spring 2023',
      description: 'Completed with 3.8 GPA. Courses included Advanced Database Systems, Web Development.',
      type: 'semester' as const,
      date: '2023-05-15',
      icon: <BookOpenCheck className="h-5 w-5" />
    },
    {
      id: 'doc-1',
      title: 'Passport',
      description: 'Valid until 2028. Document number: AB123456.',
      type: 'document' as const,
      date: '2023-02-10',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'ach-1',
      title: 'Web Design Competition',
      description: 'First place in the national web design hackathon.',
      type: 'achievement' as const,
      date: '2023-03-22',
      icon: <Award className="h-5 w-5" />
    }
  ];

  const recordCounts = {
    semesters: 6,
    documents: 15,
    achievements: 8
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage and organize all your records in one place.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Record
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card onClick={() => navigate('/semesters')} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Semester Records</h3>
              <p className="text-2xl font-bold">{recordCounts.semesters}</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => navigate('/documents')} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Personal Documents</h3>
              <p className="text-2xl font-bold">{recordCounts.documents}</p>
            </div>
          </div>
        </Card>

        <Card onClick={() => navigate('/achievements')} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Achievements</h3>
              <p className="text-2xl font-bold">{recordCounts.achievements}</p>
            </div>
          </div>
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Records</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentRecords.map(record => (
            <RecordCard
              key={record.id}
              id={record.id}
              title={record.title}
              description={record.description}
              type={record.type}
              date={record.date}
              icon={record.icon}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
