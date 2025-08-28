'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Upload, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { toast } = useToast();
    
    const handleSave = () => {
        toast({
            title: "Profile Updated",
            description: "Your personal information has been saved.",
        })
    }

    const handleSavePreferences = () => {
        toast({
            title: "Preferences Saved",
            description: "Your career preferences have been updated.",
        })
    }

  return (
    <div className="container mx-auto py-8">
        <div className="grid gap-8">
            <Card className="glassmorphism-card rounded-2xl">
                <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    Update your personal information.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20 glassmorphism-card p-1">
                    <AvatarImage src="https://picsum.photos/100/100" data-ai-hint="user avatar" className="rounded-full" />
                    <AvatarFallback className="rounded-full bg-transparent">
                        <User className="h-10 w-10" />
                    </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="glassmorphism-button">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                    </Button>
                </div>
                <form className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" className="glassmorphism-card-inset rounded-lg"/>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" className="glassmorphism-card-inset rounded-lg" />
                    </div>
                </form>
                </CardContent>
                <CardFooter className="border-t border-border/20 px-6 py-4">
                <Button className="glassmorphism-button" onClick={handleSave}>Save</Button>
                </CardFooter>
            </Card>

            <Card className="glassmorphism-card rounded-2xl">
                <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                    Customize your scoring based on your career goals.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="roles">Target Roles</Label>
                    <Input id="roles" placeholder="e.g., Senior Software Engineer, Product Manager" className="glassmorphism-card-inset rounded-lg"/>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="skills">Key Skills</Label>
                    <Textarea id="skills" placeholder="e.g., React, TypeScript, Node.js, AWS, Agile" className="glassmorphism-card-inset rounded-lg"/>
                    <p className="text-sm text-muted-foreground">
                        Enter skills separated by commas.
                    </p>
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="industries">Target Industries</Label>
                    <Input id="industries" placeholder="e.g., Tech, Fintech, Healthcare" className="glassmorphism-card-inset rounded-lg"/>
                    </div>
                </form>
                </CardContent>
                <CardFooter className="border-t border-border/20 px-6 py-4">
                <Button className="glassmorphism-button" onClick={handleSavePreferences}>Save Preferences</Button>
                </CardFooter>
            </Card>
            
            <Card className="glassmorphism-card rounded-2xl">
                <CardHeader>
                <CardTitle>Sign Out</CardTitle>
                <CardDescription>
                    Sign out of your account and return to the login page.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Link href="/login" className="w-full">
                    <Button variant="destructive" className="w-full glassmorphism-button bg-red-500/20 hover:bg-red-500/40 text-red-400 border-red-500/30">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                    </Button>
                </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
