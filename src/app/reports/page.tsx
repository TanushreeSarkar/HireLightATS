import { MoreHorizontal, ArrowUpDown, ChevronDown, File } from 'lucide-react';
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const reports = [
  {
    name: 'SWE, Google',
    resume: 'john_doe_resume_v4.pdf',
    score: 92,
    match: 88,
    date: '2023-06-23',
    status: 'Completed',
  },
  {
    name: 'Product Manager, Meta',
    resume: 'john_doe_pm_resume.pdf',
    score: 85,
    match: 82,
    date: '2023-06-20',
    status: 'Completed',
  },
  {
    name: 'Data Scientist, Netflix',
    resume: 'data_science_cv.pdf',
    score: 88,
    match: 91,
    date: '2023-06-18',
    status: 'Completed',
  },
  {
    name: 'UX Designer, Apple',
    resume: 'design_portfolio_resume.pdf',
    score: 95,
    match: 95,
    date: '2023-06-15',
    status: 'Completed',
  },
  {
    name: 'DevOps Engineer, Amazon',
    resume: 'devops_engineer.pdf',
    score: 78,
    match: 75,
    date: '2023-06-12',
    status: 'Pending',
  },
];

export default function ReportsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            Manage and review your generated resume reports.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem checked>All</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button>
              <File className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead className="hidden md:table-cell">Resume File</TableHead>
              <TableHead>
                <Button variant="ghost" className="-ml-4 h-8">
                  ATS Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">JD Match</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">
                <Button variant="ghost" className="-ml-4 h-8">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.name}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {report.resume}
                </TableCell>
                <TableCell>
                  <Badge variant={report.score > 90 ? "default" : report.score > 80 ? "secondary" : "destructive"} className={report.score > 90 ? "bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/20" : report.score > 80 ? "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-500/20" : "bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-500/20"}>
                    {report.score}%
                  </Badge>
                </TableCell>
                 <TableCell className="hidden sm:table-cell">
                  <Badge variant={report.match > 90 ? "default" : report.match > 80 ? "secondary" : "destructive"} className={report.match > 90 ? "bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/20" : report.match > 80 ? "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-500/20" : "bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-500/20"}>
                    {report.match}%
                  </Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={report.status === 'Completed' ? 'outline' : 'destructive'}
                    className={report.status === 'Completed' ? 'border-green-500/50 text-green-600' : 'border-amber-500/50 text-amber-600'}>
                        {report.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {report.date}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Report</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                      <DropdownMenuItem>Share Link</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 hover:!bg-red-500/10 hover:!text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
