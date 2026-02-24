'use client';

import { motion } from 'framer-motion';
import { Check, Film, Play, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCampaignStore } from '@/lib/store/campaign-store';
import { cn } from '@/lib/utils';

export function MediaPicker() {
    const { draft, toggleMediaClip } = useCampaignStore();
    const { mediaClips } = draft;

    if (mediaClips.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground/50">
                <div className="text-center space-y-2">
                    <Film className="h-8 w-8 mx-auto opacity-30" />
                    <p>No media clips found yet</p>
                    <p className="text-xs">AI will discover video clips when you run a search</p>
                </div>
            </div>
        );
    }

    const selectedCount = mediaClips.filter((c) => c.selected).length;

    return (
        <div className="space-y-3 p-1">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {selectedCount} of {mediaClips.length} clips selected
                </span>
                <Badge variant="outline" className="text-xs">
                    <Film className="mr-1 h-3 w-3" />
                    Pexels Stock
                </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {mediaClips.map((clip, i) => (
                    <motion.div
                        key={clip.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card
                            onClick={() => toggleMediaClip(clip.id)}
                            className={cn(
                                'group cursor-pointer overflow-hidden border-border transition-all',
                                clip.selected
                                    ? 'border-primary ring-1 ring-primary/30'
                                    : 'hover:border-muted-foreground/30'
                            )}
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${clip.thumbnailUrl})`,
                                    }}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                                {/* Play icon overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                                        <Play className="h-5 w-5 text-white fill-white" />
                                    </div>
                                </div>

                                {/* Selection indicator */}
                                <div className={cn(
                                    'absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all',
                                    clip.selected
                                        ? 'border-primary bg-primary'
                                        : 'border-white/50 bg-black/30'
                                )}>
                                    {clip.selected && <Check className="h-3 w-3 text-primary-foreground" />}
                                </div>

                                {/* Duration */}
                                <div className="absolute bottom-2 right-2">
                                    <Badge className="border-0 bg-black/60 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5">
                                        <Clock className="mr-0.5 h-2.5 w-2.5" />
                                        {clip.duration}s
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-2">
                                <p className="text-xs font-medium text-foreground truncate">{clip.title}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{clip.source}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
