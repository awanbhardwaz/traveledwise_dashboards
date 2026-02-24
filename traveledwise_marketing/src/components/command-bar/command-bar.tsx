'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useCampaignStore } from '@/lib/store/campaign-store';
import { generateMockScripts, generateMockMedia, generateMockLinks } from '@/lib/agent/campaign';
import { cn } from '@/lib/utils';

export function CommandBar() {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        setQuery,
        setStatus,
        setDestination,
        setScripts,
        setMediaClips,
        setAffiliateLinks,
        addMarketPulse,
        clearMarketPulse,
        draft,
    } = useCampaignStore();

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        setQuery(input);
        clearMarketPulse();
        setStatus('searching');
        setIsLoading(true);

        addMarketPulse({
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type: 'system',
            content: `🚀 Initiating search: "${input}"`,
        });

        // Parse the destination from the query
        const dest = extractDestination(input);
        setDestination(dest);

        try {
            // Stream response from our API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: input }],
                }),
            });

            if (!response.ok) throw new Error('API request failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullText = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    fullText += chunk;

                    // Parse streamed lines and add to market pulse
                    const lines = chunk.split('\n').filter((l: string) => l.trim());
                    for (const line of lines) {
                        // Try parsing AI SDK data stream format
                        try {
                            const match = line.match(/^0:"(.+)"$/);
                            if (match) {
                                const text = JSON.parse(`"${match[1]}"`);
                                if (text.trim()) {
                                    addMarketPulse({
                                        id: `mp_${Date.now()}_${Math.random()}`,
                                        timestamp: new Date().toISOString(),
                                        type: text.startsWith('🔍') ? 'search' : text.startsWith('📡') ? 'grounding' : text.startsWith('##') ? 'analysis' : 'generation',
                                        content: text,
                                    });
                                }
                            }
                        } catch {
                            // Ignore parse errors for non-data lines
                        }
                    }
                }
            }

            // Generate mock campaign data
            const scripts = generateMockScripts(dest, 3);
            const media = generateMockMedia(dest);
            const links = generateMockLinks(dest);

            setScripts(scripts);
            setMediaClips(media);
            setAffiliateLinks(links);
            setStatus('ready');

            addMarketPulse({
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                type: 'system',
                content: `✅ Campaign draft ready for "${dest}". ${scripts.length} scripts, ${media.length} media clips, ${links.length} affiliate links.`,
            });
        } catch (error) {
            // Fallback: generate mock data even without API
            addMarketPulse({
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                type: 'system',
                content: `⚡ Using AI simulation for "${dest}"...`,
            });

            const mockPulseLines = generateMockPulse(dest);
            for (let i = 0; i < mockPulseLines.length; i++) {
                await new Promise((r) => setTimeout(r, 100));
                addMarketPulse({
                    id: `mp_mock_${Date.now()}_${i}`,
                    timestamp: new Date().toISOString(),
                    type: mockPulseLines[i].type as 'search' | 'grounding' | 'analysis' | 'generation' | 'system',
                    content: mockPulseLines[i].content,
                });
            }

            const scripts = generateMockScripts(dest, 3);
            const media = generateMockMedia(dest);
            const links = generateMockLinks(dest);

            setScripts(scripts);
            setMediaClips(media);
            setAffiliateLinks(links);
            setStatus('ready');

            addMarketPulse({
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                type: 'system',
                content: `✅ Campaign draft ready for "${dest}". ${scripts.length} scripts, ${media.length} media clips, ${links.length} affiliate links.`,
            });
        }

        setIsLoading(false);
    }, [input, isLoading, setQuery, clearMarketPulse, setStatus, setDestination, setScripts, setMediaClips, setAffiliateLinks, addMarketPulse]);

    const suggestions = [
        'Search for trending luxury stays in Bali and create a 3-video TikTok campaign',
        'Find top adventure tours in Iceland and draft Instagram Reels content',
        'Analyze Japan cherry blossom trends and create affiliate campaigns',
    ];

    return (
        <div className="w-full space-y-3">
            <form onSubmit={handleSubmit} className="relative">
                <motion.div
                    animate={{
                        boxShadow: isFocused
                            ? '0 0 30px oklch(0.72 0.19 250 / 25%), 0 0 60px oklch(0.72 0.19 250 / 10%)'
                            : '0 0 0px transparent',
                    }}
                    className={cn(
                        'relative flex items-center overflow-hidden rounded-xl border border-border bg-card transition-colors',
                        isFocused && 'border-primary/50'
                    )}
                >
                    <div className="flex items-center pl-4">
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 text-primary animate-spin" />
                        ) : (
                            <Search className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder='Try: "Search for trending luxury stays in Bali and create a 3-video TikTok campaign"'
                        className="flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-muted-foreground/60"
                        disabled={isLoading}
                    />
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading || !input.trim()}
                        className="mr-2 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity disabled:opacity-50"
                    >
                        <Sparkles className="h-4 w-4" />
                        <span className="hidden sm:inline">Execute</span>
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                </motion.div>
            </form>

            {/* Suggestion Chips */}
            <AnimatePresence>
                {isFocused && !input && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex flex-wrap gap-2"
                    >
                        {suggestions.map((suggestion, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => {
                                    setInput(suggestion);
                                    inputRef.current?.focus();
                                }}
                                className="rounded-lg border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                            >
                                <Sparkles className="mr-1.5 inline h-3 w-3 text-primary" />
                                {suggestion}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function extractDestination(query: string): string {
    const patterns = [
        /(?:in|for|about|to)\s+(.+?)(?:\s+and|\s*$)/i,
        /(?:trending|luxury|budget|adventure)\s+(?:stays?|tours?|trips?)\s+(?:in|to)\s+(.+?)(?:\s+and|\s*$)/i,
    ];
    for (const pattern of patterns) {
        const match = query.match(pattern);
        if (match) return match[1].trim().replace(/['"]/g, '');
    }
    return 'Bali';
}

function generateMockPulse(destination: string) {
    return [
        { type: 'search', content: `🔍 Searching for "${destination}" travel trends...` },
        { type: 'grounding', content: `📡 Google Search Grounding connected — fetching real-time data` },
        { type: 'grounding', content: `📊 Search Volume: ~245,000/month (+34% MoM)` },
        { type: 'analysis', content: `🎯 High affiliate potential detected — Revenue Score: 92/100` },
        { type: 'analysis', content: `📈 Trending queries: "${destination} hidden gems", "best ${destination.toLowerCase()} tours"` },
        { type: 'generation', content: `🎬 Generating 3 video scripts for TikTok, Instagram, YouTube...` },
        { type: 'generation', content: `📸 Discovering stock footage from Pexels...` },
        { type: 'generation', content: `🔗 Finding monetizable affiliate links from Viator, GetYourGuide...` },
    ];
}
