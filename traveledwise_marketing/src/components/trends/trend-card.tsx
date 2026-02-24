'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Star, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCampaignStore } from '@/lib/store/campaign-store';
import type { Trend } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { generateMockScripts, generateMockMedia, generateMockLinks } from '@/lib/agent/campaign';

function Sparkline({ data }: { data: number[] }) {
    if (!data.length) return null;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((val, i) => ({
        x: (i / (data.length - 1)) * 64,
        y: 32 - ((val - min) / range) * 24 - 4, // 24 is max height, 4 is padding
    }));

    const pathData = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;

    return (
        <svg width="64" height="32" viewBox="0 0 64 32" className="overflow-visible">
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                d={pathData}
                fill="none"
                stroke="oklch(0.72 0.19 250)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function TrendCard({ trend, index }: { trend: Trend; index: number }) {
    const { hydrateFromTrend, setScripts, setMediaClips, setAffiliateLinks } = useCampaignStore();
    const router = useRouter();

    const handleClick = () => {
        hydrateFromTrend(trend);
        // Auto-generate campaign data from trend
        setScripts(generateMockScripts(trend.name, 3));
        setMediaClips(generateMockMedia(trend.name));
        setAffiliateLinks(generateMockLinks(trend.name));
        router.push('/campaigns');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="cursor-pointer"
            onClick={handleClick}
        >
            <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${trend.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute right-3 top-3">
                        <Badge className="border-0 bg-black/50 backdrop-blur-sm text-white">
                            <MapPin className="mr-1 h-3 w-3" />
                            {trend.region}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-3 p-4">
                    {/* Title & Volume */}
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {trend.name}
                            </h3>
                            <div className="mt-1 flex items-center gap-2">
                                <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                                <span className="text-xs text-muted-foreground">
                                    {trend.searchVolume.toLocaleString()} searches/mo
                                </span>
                                <span className="text-xs font-medium text-green-400">
                                    +{trend.volumeChange}%
                                </span>
                            </div>
                        </div>
                        {/* Sparkline */}
                        <div className="h-8 w-16 pt-1">
                            <Sparkline data={trend.trendHistory} />
                        </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-60">
                        <div className="h-1 w-1 rounded-full bg-blue-400" />
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Google Trends Grounded</span>
                    </div>

                    {/* Top Tours */}
                    <div className="space-y-1.5">
                        {trend.topTours.slice(0, 2).map((tour) => (
                            <div
                                key={tour.id}
                                className="flex items-center gap-2 rounded-md bg-background/50 px-2 py-1.5 text-xs"
                            >
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star className="h-3 w-3 fill-yellow-400" />
                                    <span>{tour.rating}</span>
                                </div>
                                <span className="flex-1 truncate text-muted-foreground">{tour.title}</span>
                                <span className="font-medium text-foreground">${tour.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Market Intelligence */}
                    <div className="space-y-3 border-t border-border/50 pt-3">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Catalyst</span>
                            <p className="text-xs leading-relaxed text-foreground/90">{trend.whyTrending}</p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-wider text-destructive font-bold">Friction Point</span>
                            <p className="text-xs leading-relaxed text-muted-foreground">{trend.frictionPoint}</p>
                        </div>

                        {/* Human Signals */}
                        <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Human Signals (Last 30 Days)</span>
                            <div className="flex flex-wrap gap-1.5">
                                {trend.humanSignals.slice(0, 2).map((sig, i) => (
                                    <div key={i} className="flex items-center gap-1.5 rounded-md bg-secondary/50 px-2 py-1 text-[10px] border border-border/50">
                                        <span className="font-bold text-primary">{sig.source}</span>
                                        <span className="truncate max-w-[120px] italic">"{sig.snippet}"</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" style={{
                    background: 'radial-gradient(300px at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.72 0.19 250 / 6%), transparent 70%)',
                }} />
            </Card>
        </motion.div>
    );
}
