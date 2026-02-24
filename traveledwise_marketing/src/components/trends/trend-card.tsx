'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Star, ExternalLink, DollarSign, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCampaignStore } from '@/lib/store/campaign-store';
import type { Trend } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { generateMockScripts, generateMockMedia, generateMockLinks } from '@/lib/agent/campaign';

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

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-400';
        if (score >= 75) return 'text-yellow-400';
        return 'text-orange-400';
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
                    <div>
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

                    {/* Revenue Score */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="text-xs text-muted-foreground">Revenue Potential</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-background">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trend.revenueScore}%` }}
                                    transition={{ delay: index * 0.08 + 0.3, duration: 0.6, ease: 'easeOut' }}
                                    className={`h-full rounded-full ${trend.revenueScore >= 90 ? 'bg-green-400' : trend.revenueScore >= 75 ? 'bg-yellow-400' : 'bg-orange-400'
                                        }`}
                                />
                            </div>
                            <span className={`text-xs font-bold ${getScoreColor(trend.revenueScore)}`}>
                                {trend.revenueScore}
                            </span>
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
