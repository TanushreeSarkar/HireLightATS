import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ProBanner() {
    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            <Card className="glassmorphism-card rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-8">
                    <div className='flex items-center gap-4'>
                         <div className="hidden md:block glassmorphism-button p-4 rounded-full">
                            <Rocket className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                             <h2 className="text-2xl font-bold text-gradient">Unlock PRO Features</h2>
                            <p className="text-muted-foreground mt-1">
                                Advanced analytics, unlimited reports, and priority support coming soon!
                            </p>
                        </div>
                    </div>
                    <Button className="w-full md:w-auto glassmorphism-button mt-4 md:mt-0">Learn More</Button>
                </div>
            </Card>
        </div>
    );
}
