'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ArrowUpRight, Zap, Target, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useCampaignStore } from '@/lib/store/campaign-store';

interface StatCard {
    label: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    color: string;
}

export function ProfitTracker() {
    const { campaigns } = useCampaignStore();
    const [animatedProfit, setAnimatedProfit] = useState(4137);

    // Simulate profit ticking up
    useEffect(() => {
        const campaignProfit = campaigns.reduce((sum, c) => sum + c.simulatedProfit, 0);
        const baseProfit = 4137 + campaignProfit;

        const interval = setInterval(() => {
            setAnimatedProfit((prev) => prev + Math.floor(Math.random() * 3));
        }, 3000);

        setAnimatedProfit(baseProfit);
        return () => clearInterval(interval);
    }, [campaigns]);

    const stats: StatCard[] = [
        {
            label: 'Total Revenue',
            value: `$${animatedProfit.toLocaleString()}`,
            change: '+23.5%',
            icon: <DollarSign className="h-4 w-4" />,
            color: 'text-green-400',
        },
        {
            label: 'Active Campaigns',
            value: `${2 + campaigns.filter((c) => c.status === 'live').length}`,
            change: '+2 this week',
            icon: <Zap className="h-4 w-4" />,
            color: 'text-primary',
        },
        {
            label: 'Click-Through Rate',
            value: '4.8%',
            change: '+0.6%',
            icon: <Target className="h-4 w-4" />,
            color: 'text-yellow-400',
        },
        {
            label: 'Audience Reach',
            value: '284K',
            change: '+18.2%',
            icon: <Users className="h-4 w-4" />,
            color: 'text-purple-400',
        },
    ];

    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                    <Card className="relative overflow-hidden border-border bg-card p-4 group hover:border-primary/20 transition-colors">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                                <p className="mt-1 text-2xl font-bold tracking-tight">{stat.value}</p>
                                <div className="mt-1 flex items-center gap-1">
                                    <ArrowUpRight className={`h-3 w-3 ${stat.color}`} />
                                    <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
                                </div>
                            </div>
                            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-background ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                        {/* Subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
