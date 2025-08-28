import { ListFilter, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const historyData = [
  {
    file: 'john_doe_resume_v4.pdf',
    type: 'Resume',
    status: 'Processed',
    date: '2023-06-23',
  },
  {
    file: 'job_desc_google_swe.txt',
    type: 'Job Description',
    status: 'Processed',
    date: '2023-06-23',
  },
  {
    file: 'john_doe_pm_resume.pdf',
    type: 'Resume',
    status: 'Processed',
    date: '2023-06-20',
  },
  {
    file: 'job_desc_meta_pm.pdf',
    type: 'Job Description',
    status: 'Processed',
    date: '2023-06-20',
  },
  {
    file: 'data_science_cv.pdf',
    type: 'Resume',
    status: 'Processing',
    date: '2023-06-18',
  },
];

const HistoryTable = ({ data }: { data: typeof historyData }) => (
    <Card>
      <CardHeader>
        <CardTitle>Upload History</CardTitle>
        <CardDescription>
          A log of all your uploaded documents.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.file}>
                <TableCell className="font-medium">{item.file}</TableCell>
                <TableCell>
                  <Badge variant={item.type === 'Resume' ? 'default' : 'secondary'}>
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Processed' ? 'outline' : 'destructive'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
)

export default function HistoryPage() {
  const resumes = historyData.filter((item) => item.type === 'Resume');
  const jobDescriptions = historyData.filter((item) => item.type === 'Job Description');

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="resume">Resumes</TabsTrigger>
          <TabsTrigger value="jd">Job Descriptions</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Processed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Processing</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Error</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
        </div>
      </div>
      <TabsContent value="all">
        <HistoryTable data={historyData} />
      </TabsContent>
      <TabsContent value="resume">
        <HistoryTable data={resumes} />
      </TabsContent>
      <TabsContent value="jd">
        <HistoryTable data={jobDescriptions} />
      </TabsContent>
    </Tabs>
  );
}
