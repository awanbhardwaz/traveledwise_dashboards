'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendCard } from './trend-card';
import type { Trend } from '@/lib/types';
import { getMockTrends } from '@/lib/agent/trends';

const CATEGORIES = ['All', 'Luxury', 'Adventure', 'Cultural', 'Beach', 'Budget'];

export function TrendsGrid() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        loadTrends();
    }, []);

    const loadTrends = async () => {
        setLoading(true);
        // Use mock data directly for instant loading
        const data = getMockTrends();
        setTrends(data);
        setLoading(false);
    };

    const filteredTrends = activeCategory === 'All'
        ? trends
        : trends.filter((t) => t.category === activeCategory);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold">Trending Destinations</h2>
                    <p className="text-sm text-muted-foreground">
                        Click any trend to hydrate your campaign workspace
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={loadTrends}
                    disabled={loading}
                    className="gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <Badge
                        key={cat}
                        variant={activeCategory === cat ? 'default' : 'outline'}
                        className={`cursor-pointer transition-all ${activeCategory === cat
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:border-primary/30'
                            }`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </Badge>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-72 rounded-xl shimmer" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTrends.map((trend, i) => (
                        <TrendCard key={trend.id} trend={trend} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
