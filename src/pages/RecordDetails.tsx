
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Award, Edit, Trash2, BookOpen, MapPin, Building, Users, Certificate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

// Type definitions for different record types
type SemesterRecord = {
  gpa: string;
  courses: { code: string; name: string; grade: string }[];
  notes: string;
};

type DocumentRecord = {
  documentNumber: string;
  expiryDate: string;
  issuingAuthority: string;
  location: string;
};

type AchievementRecord = {
  organization: string;
  position: string;
  teamMembers: string[];
  projectName: string;
  certificate: boolean;
};

// Union type for all record types
type RecordDetails = SemesterRecord | DocumentRecord | AchievementRecord;

// Guard functions to check record type
const isSemesterRecord = (record: RecordDetails): record is SemesterRecord => 
  'gpa' in record && 'courses' in record;

const isDocumentRecord = (record: RecordDetails): record is DocumentRecord => 
  'documentNumber' in record && 'issuingAuthority' in record;

const isAchievementRecord = (record: RecordDetails): record is AchievementRecord => 
  'organization' in record && 'projectName' in record;

const RecordDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  // Sample data - in a real app, this would be fetched from your API
  const records: Record<string, { 
    type: 'semester' | 'document' | 'achievement'; 
    title: string; 
    date: string;
    description: string;
    details: RecordDetails;
  }> = {
    'sem-1': {
      type: 'semester',
      title: 'Spring Semester 2023',
      date: '2023-05-15',
      description: 'Computer Science - Year 2, Semester 2',
      details: {
        gpa: '3.8',
        courses: [
          { code: 'CS201', name: 'Data Structures', grade: 'A' },
          { code: 'CS202', name: 'Database Systems', grade: 'A-' },
          { code: 'MTH201', name: 'Linear Algebra', grade: 'B+' },
          { code: 'ENG101', name: 'Technical Writing', grade: 'A' }
        ],
        notes: 'Excellent semester overall. Struggled a bit with Linear Algebra initially.'
      }
    },
    'doc-1': {
      type: 'document',
      title: 'Passport',
      date: '2023-02-10',
      description: 'Valid until 2028. Document number: AB123456.',
      details: {
        documentNumber: 'AB123456',
        expiryDate: '2028-02-10',
        issuingAuthority: 'Department of State',
        location: 'Washington DC'
      }
    },
    'ach-1': {
      type: 'achievement',
      title: 'Hackathon Winner',
      date: '2023-03-20',
      description: 'First place in the University Hackathon 2023',
      details: {
        organization: 'Tech University',
        position: 'Team Lead',
        teamMembers: ['John Doe', 'Jane Smith', 'Alex Johnson'],
        projectName: 'EcoTrack - Sustainability Monitoring System',
        certificate: true
      }
    }
  };

  const record = id ? records[id] : null;

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Record Not Found</h1>
        <p className="text-muted-foreground mb-6">The record you're looking for doesn't exist.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const formattedDate = format(new Date(record.date), 'MMMM d, yyyy');
  const RecordIcon = record.type === 'semester' ? BookOpen : record.type === 'document' ? FileText : Award;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <RecordIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{record.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
      
      <Card>
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="mb-1">Record Details</CardTitle>
                <CardDescription>{record.description}</CardDescription>
              </div>
              <Badge className="capitalize">{record.type}</Badge>
            </div>
            
            <TabsList className="mt-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              {isSemesterRecord(record.details) && (
                <TabsTrigger value="courses">Courses</TabsTrigger>
              )}
            </TabsList>
          </CardHeader>

          <CardContent className="pt-6">
            <TabsContent value="details">
              {isSemesterRecord(record.details) && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">GPA: {record.details.gpa}</Badge>
                  </div>
                  
                  {record.details.notes && (
                    <div>
                      <h3 className="font-medium mb-2">Notes</h3>
                      <p className="text-muted-foreground">{record.details.notes}</p>
                    </div>
                  )}
                </div>
              )}
              
              {isDocumentRecord(record.details) && (
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-1">Document Number</h3>
                      <p className="text-muted-foreground">{record.details.documentNumber}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Expiry Date</h3>
                      <p className="text-muted-foreground">
                        {format(new Date(record.details.expiryDate), 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-1">Issuing Authority</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>{record.details.issuingAuthority}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{record.details.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {isAchievementRecord(record.details) && (
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-1">Organization</h3>
                      <p className="text-muted-foreground">{record.details.organization}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Position</h3>
                      <p className="text-muted-foreground">{record.details.position}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Project</h3>
                    <p className="text-muted-foreground">{record.details.projectName}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Team Members</h3>
                    <div className="flex flex-wrap gap-2">
                      {record.details.teamMembers.map((member, index) => (
                        <Badge key={index} variant="secondary">{member}</Badge>
                      ))}
                    </div>
                  </div>

                  {record.details.certificate && (
                    <div className="flex items-center gap-2">
                      <Certificate className="h-5 w-5 text-amber-500" />
                      <span className="font-medium">Certified Achievement</span>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            {isSemesterRecord(record.details) && (
              <TabsContent value="courses">
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted border-b">
                        <th className="text-left py-3 px-4">Code</th>
                        <th className="text-left py-3 px-4">Course</th>
                        <th className="text-right py-3 px-4">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.details.courses.map((course, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-3 px-4 font-mono text-sm">{course.code}</td>
                          <td className="py-3 px-4">{course.name}</td>
                          <td className="py-3 px-4 text-right font-medium">{course.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            )}
          </CardContent>
          
          <CardFooter className="border-t pt-6 flex justify-between">
            <div className="text-xs text-muted-foreground">
              Record ID: {id}
            </div>
            <div className="text-xs text-muted-foreground">
              Last updated: {formattedDate}
            </div>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default RecordDetails;
