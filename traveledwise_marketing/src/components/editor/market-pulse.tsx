'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCampaignStore } from '@/lib/store/campaign-store';

export function MarketPulse() {
    const { draft } = useCampaignStore();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [draft.marketPulse]);

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'search': return 'text-blue-400';
            case 'grounding': return 'text-green-400';
            case 'analysis': return 'text-purple-400';
            case 'generation': return 'text-yellow-400';
            case 'system': return 'text-primary';
            default: return 'text-muted-foreground';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'search': return 'SEARCH';
            case 'grounding': return 'GROUND';
            case 'analysis': return 'ANALYSIS';
            case 'generation': return 'GEN';
            case 'system': return 'SYSTEM';
            default: return 'LOG';
        }
    };

    return (
        <div className="flex h-full flex-col rounded-xl border border-border bg-[oklch(0.12_0.01_260)] overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-2.5 bg-[oklch(0.1_0.01_260)]">
                <div className="flex gap-1.5">
                    <Circle className="h-3 w-3 fill-red-500 text-red-500" />
                    <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                </div>
                <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">Market Pulse — AI Reasoning</span>
                </div>
                {draft.status === 'searching' && (
                    <div className="ml-auto flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400 font-mono">LIVE</span>
                    </div>
                )}
            </div>

            {/* Terminal Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-1">
                {draft.marketPulse.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-muted-foreground/50">
                        <div className="text-center space-y-2">
                            <Terminal className="h-8 w-8 mx-auto opacity-30" />
                            <p>Awaiting command input...</p>
                            <p className="text-[10px]">Use the Search Bar above to begin</p>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {draft.marketPulse.map((entry) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-2"
                            >
                                <span className="shrink-0 text-muted-foreground/40 select-none">
                                    {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour12: false })}
                                </span>
                                <span className={`shrink-0 font-bold ${getTypeColor(entry.type)}`}>
                                    [{getTypeLabel(entry.type)}]
                                </span>
                                <span className="text-foreground/80 whitespace-pre-wrap break-words">
                                    {entry.content}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                {draft.status === 'searching' && (
                    <div className="terminal-cursor text-primary mt-1" />
                )}
            </div>
        </div>
    );
}
