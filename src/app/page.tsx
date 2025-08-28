'use client';

import {
  Activity,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Lightbulb,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/animated-counter';
import { useEffect, useState } from 'react';

const chartData = [
  { month: 'Jan', score: 78 },
  { month: 'Feb', score: 82 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 88 },
  { month: 'May', score: 89 },
  { month: 'Jun', score: 92 },
];

const chartConfig = {
  score: {
    label: 'ATS Score',
    color: 'hsl(var(--primary))',
  },
};

const recommendedSkills = [
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "GraphQL",
  "Docker"
];

const recentActivities = [
    { title: 'Resume Uploaded', time: '2 hours ago' },
    { title: 'Report Generated', time: '1 day ago' },
    { title: 'JD Matched', time: '3 days ago' },
    { title: 'Profile Updated', time: '1 week ago' },
]

export default function Dashboard() {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentActivity((prev) => (prev + 1) % recentActivities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col gap-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glassmorphism-card rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                Average ATS Score
              </CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                <AnimatedCounter targetValue={92} />%
              </div>
              <p className="text-xs text-muted-foreground">
                +4% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="glassmorphism-card rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                JD Matches
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                <AnimatedCounter targetValue={12} />
              </div>
              <p className="text-xs text-muted-foreground">
                +1 from last week
              </p>
            </CardContent>
          </Card>
          <Card className="glassmorphism-card rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                Reports Generated
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">
                <AnimatedCounter targetValue={25} />
              </div>
              <p className="text-xs text-muted-foreground">
                +5 this month
              </p>
            </CardContent>
          </Card>
          <Card className="glassmorphism-card rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>
                Recent Activity
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{recentActivities[currentActivity].title}</div>
              <p className="text-xs text-muted-foreground">{recentActivities[currentActivity].time}</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Card className="glassmorphism-card rounded-2xl">
                <CardHeader>
                <CardTitle>ATS Score Trends</CardTitle>
                <CardDescription>
                  Your average resume score trend for the last 6 months.
                </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                       <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                       <CartesianGrid strokeDasharray="3 3" className="stroke-muted-foreground/20" />
                      <Tooltip
                        cursor={{ fill: 'hsla(var(--background), 0.3)' }}
                        content={<ChartTooltipContent indicator="dot" className="glassmorphism-card" />}
                      />
                      <Area
                        dataKey="score"
                        type="monotone"
                        fill="url(#colorScore)"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
            </Card>
            <Card className="glassmorphism-card rounded-2xl">
              <CardHeader>
                <CardTitle>Recommended Skills</CardTitle>
                <CardDescription>
                  AI-powered skill suggestions to boost your score.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 min-h-[300px]">
                {recommendedSkills.map((skill) => (
                  <div key={skill} className="flex items-center text-sm">
                    <Lightbulb className="mr-2 h-4 w-4 text-primary" />
                    {skill}
                  </div>
                ))}
              </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 gap-8">
            <Card className="glassmorphism-card rounded-2xl">
                <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>JD Match</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Software Engineer</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            Acme Inc.
                        </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">Completed</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">88%</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">92%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                        <div className="font-medium">Product Manager</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            Innovate Corp.
                        </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">Completed</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">82%</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">85%</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
