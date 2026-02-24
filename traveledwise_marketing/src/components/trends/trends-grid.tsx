'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Search, X, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TrendCard } from './trend-card';
import type { Trend } from '@/lib/types';

const CATEGORIES = ['All', 'Luxury', 'Adventure', 'Cultural', 'Beach', 'Budget'];

export function TrendsGrid() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const loadTrends = useCallback(async (query?: string) => {
        // Abort any previous in-flight request
        if (abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        if (query) {
            setSearching(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const url = query
                ? `/api/trends?q=${encodeURIComponent(query)}`
                : '/api/trends';

            const res = await fetch(url, {
                signal: controller.signal,
            });

            if (!res.ok) {
                console.error(`Trends API returned ${res.status}: ${res.statusText}`);
                setError('Failed to load trends. Please try again.');
                return;
            }

            const data = await res.json();
            setTrends(data.trends ?? []);
        } catch (err: unknown) {
            if (err instanceof DOMException && err.name === 'AbortError') {
                return; // Request was cancelled, ignore
            }
            console.error('Failed to load trends:', err);
            setError('Connection error. Please check your network and try again.');
        } finally {
            setLoading(false);
            setSearching(false);
        }
    }, []);

    useEffect(() => {
        loadTrends();
    }, [loadTrends]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = searchInput.trim();
        if (!q) return;
        setSearchQuery(q);
        setActiveCategory('All');
        loadTrends(q);
    };

    const clearSearch = () => {
        // Abort current search if running
        if (abortRef.current) {
            abortRef.current.abort();
        }
        setSearchInput('');
        setSearchQuery('');
        setSearching(false);
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
                    disabled={loading || searching}
                    className="gap-2"
                >
                    <RefreshCw className={`h-4 w-4 ${(loading || searching) ? 'animate-spin' : ''}`} />
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
                            placeholder='Search destinations... (e.g. "India", "luxury beach", "budget Europe")'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="pl-10 pr-10 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
                            disabled={searching}
                        />
                        {searchInput && !searching && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <Button type="submit" size="sm" disabled={loading || searching || !searchInput.trim()} className="gap-2 shrink-0">
                        {searching ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Search className="h-4 w-4" />
                        )}
                        Search
                    </Button>
                </div>

                {/* Search Status */}
                <AnimatePresence mode="wait">
                    {searching && (
                        <motion.div
                            key="searching"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-3 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
                        >
                            <div className="relative flex h-5 w-5 items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">
                                    Searching Google Trends for &ldquo;{searchQuery}&rdquo;...
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    AI is grounding results against live search data. This may take 15-30 seconds.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="text-xs text-muted-foreground hover:text-foreground underline"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    )}

                    {!searching && searchQuery && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
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
                </AnimatePresence>
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

            {/* Error */}
            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                >
                    {error}
                </motion.div>
            )}

            {/* Grid */}
            {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-72 rounded-xl shimmer" />
                    ))}
                </div>
            ) : filteredTrends.length === 0 && !searching ? (
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
