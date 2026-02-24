'use client';

import { motion } from 'framer-motion';
import { CommandBar } from '@/components/command-bar/command-bar';
import { EditorLayout } from '@/components/editor/editor-layout';
import { DeployButton } from '@/components/dashboard/deploy-button';
import { useCampaignStore } from '@/lib/store/campaign-store';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export default function CampaignsPage() {
    const { draft } = useCampaignStore();

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-start justify-between gap-4"
            >
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">
                            Campaign <span className="gradient-text">Editor</span>
                        </h1>
                        {draft.destination && (
                            <Badge variant="outline" className="border-primary/30 gap-1 text-primary">
                                <MapPin className="h-3 w-3" />
                                {draft.destination}
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {draft.status === 'idle'
                            ? 'Search or click a trend to start building a campaign'
                            : `Working on: "${draft.query || draft.destination}"`}
                    </p>
                </div>
                <div className="w-64">
                    <DeployButton />
                </div>
            </motion.div>

            {/* Command Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <CommandBar />
            </motion.div>

            {/* Editor */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <EditorLayout />
            </motion.div>
        </div>
    );
}
