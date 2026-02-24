'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TrendCard } from './trend-card';
import type { Trend } from '@/lib/types';

const CATEGORIES = ['All', 'Luxury', 'Adventure', 'Cultural', 'Beach', 'Budget'];

export function TrendsGrid() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const loadTrends = useCallback(async (query?: string) => {
        setLoading(true);
        try {
            const url = query
                ? `/api/trends?q=${encodeURIComponent(query)}`
                : '/api/trends';
            const res = await fetch(url);
            if (!res.ok) {
                console.error(`Trends API returned ${res.status}: ${res.statusText}`);
                setTrends([]);
                return;
            }
            const data = await res.json();
            setTrends(data.trends ?? []);
        } catch (error) {
            console.error('Failed to load trends:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTrends();
    }, [loadTrends]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchInput.trim();
        setSearchQuery(q);
        setActiveCategory('All');
        loadTrends(q || undefined);
    };

    const clearSearch = () => {
        setSearchInput('');
        setSearchQuery('');
        loadTrends();
    };

    const filteredTrends = activeCategory === 'All'
        ? trends
        : trends.filter((t) => t.category === activeCategory);

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold">Trending Right Now</h2>
                    <p className="text-sm text-muted-foreground">
                        Real-time travel destinations trending on Google — powered by Gemini + Search Grounding
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadTrends(searchQuery || undefined)}
                    disabled={loading}
                    className="gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search any destination or niche... (e.g. &quot;India&quot;, &quot;luxury beach&quot;, &quot;budget Europe&quot;)"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
                        />
                        {searchInput && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <Button type="submit" size="sm" disabled={loading} className="gap-2 shrink-0">
                        <Search className="h-4 w-4" />
                        Search
                    </Button>
                </div>
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"
                    >
                        <span>
                            Showing AI-powered results for <span className="font-medium text-foreground">&ldquo;{searchQuery}&rdquo;</span>
                        </span>
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="underline hover:text-foreground transition-colors"
                        >
                            Clear
                        </button>
                    </motion.div>
                )}
            </form>

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
            ) : filteredTrends.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                >
                    <Search className="h-10 w-10 text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground font-medium">No trends found</p>
                    <p className="text-sm text-muted-foreground/60 mt-1">
                        Try a different search term or category
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" onClick={clearSearch}>
                        Show all trends
                    </Button>
                </motion.div>
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
