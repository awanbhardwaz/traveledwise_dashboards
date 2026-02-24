'use client';

import { motion } from 'framer-motion';
import { FileText, Hash, Clock, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useCampaignStore } from '@/lib/store/campaign-store';

export function ScriptEditor() {
    const { draft, updateScript } = useCampaignStore();
    const { scripts } = draft;

    if (scripts.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground/50">
                <div className="text-center space-y-2">
                    <FileText className="h-8 w-8 mx-auto opacity-30" />
                    <p>No scripts generated yet</p>
                    <p className="text-xs">Use the Command Bar to generate campaign scripts</p>
                </div>
            </div>
        );
    }

    const platformIcon = (platform: string) => {
        switch (platform) {
            case 'tiktok': return '🎵';
            case 'instagram': return '📸';
            case 'youtube': return '▶️';
            default: return '📹';
        }
    };

    const platformColor = (platform: string) => {
        switch (platform) {
            case 'tiktok': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
            case 'instagram': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            case 'youtube': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    return (
        <div className="space-y-4 p-1">
            {scripts.map((script, i) => (
                <motion.div
                    key={script.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Card className="overflow-hidden border-border bg-card">
                        {/* Script Header */}
                        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{platformIcon(script.platform)}</span>
                                <Badge variant="outline" className={platformColor(script.platform)}>
                                    {script.platform.charAt(0).toUpperCase() + script.platform.slice(1)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">Video {i + 1}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {script.duration}s
                            </div>
                        </div>

                        <div className="space-y-3 p-4">
                            {/* Hook */}
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <Sparkles className="h-3 w-3 text-primary" />
                                    HOOK (First 3 Seconds)
                                </label>
                                <Textarea
                                    value={script.hook}
                                    onChange={(e) => updateScript(script.id, { hook: e.target.value })}
                                    className="min-h-[60px] resize-none bg-background/50 text-sm"
                                />
                            </div>

                            {/* Body */}
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <FileText className="h-3 w-3 text-primary" />
                                    BODY
                                </label>
                                <Textarea
                                    value={script.body}
                                    onChange={(e) => updateScript(script.id, { body: e.target.value })}
                                    className="min-h-[90px] resize-none bg-background/50 text-sm"
                                />
                            </div>

                            {/* CTA */}
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <Sparkles className="h-3 w-3 text-yellow-400" />
                                    CALL TO ACTION
                                </label>
                                <Textarea
                                    value={script.cta}
                                    onChange={(e) => updateScript(script.id, { cta: e.target.value })}
                                    className="min-h-[50px] resize-none bg-background/50 text-sm"
                                />
                            </div>

                            {/* Hashtags */}
                            <div>
                                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <Hash className="h-3 w-3 text-primary" />
                                    HASHTAGS
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {script.hashtags.map((tag, j) => (
                                        <Badge
                                            key={j}
                                            variant="outline"
                                            className="text-xs border-primary/20 text-primary/80"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
