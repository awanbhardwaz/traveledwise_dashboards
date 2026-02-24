'use client';

import { Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useCampaignStore } from '@/lib/store/campaign-store';

export function Header() {
    const { draft } = useCampaignStore();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                        AI Engine: <span className="text-primary font-medium">Gemini 1.5 Pro</span>
                    </span>
                </div>
                {draft.status !== 'idle' && (
                    <Badge variant="outline" className="border-primary/30 text-primary">
                        {draft.status === 'searching' && '🔍 Searching...'}
                        {draft.status === 'drafting' && '✏️ Drafting'}
                        {draft.status === 'ready' && '✅ Ready'}
                        {draft.status === 'deploying' && '🚀 Deploying...'}
                        {draft.status === 'live' && '🟢 Live'}
                    </Badge>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-chart-5" />
                </Button>
                <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        TW
                    </AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}
