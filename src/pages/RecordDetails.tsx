
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Award, 
  BookOpenCheck, 
  Calendar, 
  ChevronLeft, 
  Clock, 
  Download, 
  FileText, 
  Pencil, 
  Share2, 
  Trash2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const RecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Sample data - in a real app, this would be fetched from your API based on the ID
  // We'll determine the record type from the ID prefix
  const recordType = id?.startsWith('sem-') ? 'semester' : 
                    id?.startsWith('doc-') ? 'document' : 
                    id?.startsWith('ach-') ? 'achievement' : 'unknown';
  
  const records = {
    'sem-1': {
      id: 'sem-1',
      title: 'Spring 2023',
      description: 'Completed with 3.8 GPA. Courses included Advanced Database Systems, Web Development, and Machine Learning.',
      type: 'semester' as const,
      date: 'May 15, 2023',
      dateAdded: 'June 1, 2023',
      details: {
        gpa: '3.8/4.0',
        courses: [
          { code: 'CS401', name: 'Advanced Database Systems', grade: 'A' },
          { code: 'CS402', name: 'Web Development', grade: 'A-' },
          { code: 'CS403', name: 'Machine Learning', grade: 'B+' }
        ],
        notes: 'Challenging semester but made good progress on major requirements.'
      }
    },
    'doc-1': {
      id: 'doc-1',
      title: 'Passport',
      description: 'Valid until 2028. Document number: AB123456.',
      type: 'document' as const,
      date: 'February 10, 2023',
      dateAdded: 'February 15, 2023',
      details: {
        documentNumber: 'AB123456',
        expiryDate: 'February 9, 2028',
        issuingAuthority: 'Department of State',
        location: 'Secure Cabinet, Home Office'
      }
    },
    'ach-1': {
      id: 'ach-1',
      title: 'Web Design Competition',
      description: 'First place in the national web design hackathon.',
      type: 'achievement' as const,
      date: 'March 22, 2023',
      dateAdded: 'March 25, 2023',
      details: {
        organization: 'National Design Association',
        position: 'First Place',
        teamMembers: ['John Smith', 'Jane Doe'],
        projectName: 'EcoTech Dashboard',
        certificate: true
      }
    }
  };
  
  const record = records[id as keyof typeof records];
  
  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Record Not Found</h2>
        <p className="text-muted-foreground mb-6">The record you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate(-1)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }
  
  const getIcon = () => {
    switch (record.type) {
      case 'semester': return <BookOpenCheck className="h-6 w-6" />;
      case 'document': return <FileText className="h-6 w-6" />;
      case 'achievement': return <Award className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-4">
              {getIcon()}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{record.title}</h1>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{record.date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>Added {record.dateAdded}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the
                    record and remove the data from the servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => {
                    setDeleteDialogOpen(false);
                    navigate(-1);
                  }}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
              <CardDescription>{record.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="info">
                <TabsList>
                  <TabsTrigger value="info">Information</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  {record.type === 'semester' && <TabsTrigger value="courses">Courses</TabsTrigger>}
                </TabsList>
                
                <TabsContent value="info" className="mt-4 space-y-4">
                  {record.type === 'semester' && (
                    <div>
                      <h3 className="font-medium mb-2">GPA</h3>
                      <p>{record.details.gpa}</p>
                    </div>
                  )}
                  
                  {record.type === 'document' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-1">Document Number</h3>
                          <p className="text-muted-foreground">{record.details.documentNumber}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Expiry Date</h3>
                          <p className="text-muted-foreground">{record.details.expiryDate}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Issuing Authority</h3>
                          <p className="text-muted-foreground">{record.details.issuingAuthority}</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Location</h3>
                          <p className="text-muted-foreground">{record.details.location}</p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {record.type === 'achievement' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Organization</h3>
                        <p className="text-muted-foreground">{record.details.organization}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Position</h3>
                        <p className="text-muted-foreground">{record.details.position}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Project Name</h3>
                        <p className="text-muted-foreground">{record.details.projectName}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Certificate Available</h3>
                        <p className="text-muted-foreground">{record.details.certificate ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="font-medium mb-1">Team Members</h3>
                        <div className="flex flex-wrap gap-2">
                          {record.details.teamMembers.map((member, index) => (
                            <div key={index} className="bg-secondary px-3 py-1 rounded-full text-sm">
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="notes" className="mt-4">
                  <p>{record.details.notes || 'No notes available for this record.'}</p>
                </TabsContent>
                
                {record.type === 'semester' && (
                  <TabsContent value="courses" className="mt-4">
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left">Code</th>
                            <th className="px-4 py-2 text-left">Course Name</th>
                            <th className="px-4 py-2 text-left">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.details.courses.map((course, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2">{course.code}</td>
                              <td className="px-4 py-2">{course.name}</td>
                              <td className="px-4 py-2 font-medium">{course.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Related Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">No related records found.</p>
              </div>
            </CardContent>
          </Card>
          
          {record.type === 'document' && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Storage Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Physical Location</h3>
                    <p className="text-sm text-muted-foreground">{record.details.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Digital Copy</h3>
                    <Button variant="secondary" size="sm" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {record.type === 'achievement' && record.details.certificate && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Certificate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                  <Award className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <Button variant="secondary" size="sm" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;
