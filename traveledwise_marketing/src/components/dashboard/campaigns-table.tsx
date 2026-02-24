'use client';

import { motion } from 'framer-motion';
import { MapPin, Link2, DollarSign, Clock, MoreHorizontal, Eye } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useCampaignStore } from '@/lib/store/campaign-store';
import type { Campaign } from '@/lib/types';

// Example initial campaigns for demo
const DEMO_CAMPAIGNS: Campaign[] = [
    {
        id: 'demo_001',
        name: 'Bali Luxury Villas Spring Push',
        destination: 'Bali',
        status: 'live',
        scripts: [],
        mediaClips: [],
        affiliateLinks: [],
        totalLinks: 6,
        simulatedProfit: 1247,
        createdAt: '2026-02-22T10:30:00Z',
        deployedAt: '2026-02-22T11:00:00Z',
    },
    {
        id: 'demo_002',
        name: 'Japan Cherry Blossom 2026',
        destination: 'Japan',
        status: 'live',
        scripts: [],
        mediaClips: [],
        affiliateLinks: [],
        totalLinks: 8,
        simulatedProfit: 2890,
        createdAt: '2026-02-20T14:00:00Z',
        deployedAt: '2026-02-20T15:30:00Z',
    },
    {
        id: 'demo_003',
        name: 'Iceland Adventure Package',
        destination: 'Iceland',
        status: 'scheduled',
        scripts: [],
        mediaClips: [],
        affiliateLinks: [],
        totalLinks: 4,
        simulatedProfit: 0,
        createdAt: '2026-02-24T09:00:00Z',
    },
];

export function CampaignsTable() {
    const { campaigns } = useCampaignStore();
    const allCampaigns = [...DEMO_CAMPAIGNS, ...campaigns];

    const getStatusBadge = (status: Campaign['status']) => {
        switch (status) {
            case 'live':
                return (
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                        Live
                    </Badge>
                );
            case 'rendering':
                return (
                    <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 gap-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        Rendering
                    </Badge>
                );
            case 'scheduled':
                return (
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 gap-1">
                        <Clock className="h-3 w-3" />
                        Scheduled
                    </Badge>
                );
            case 'draft':
                return (
                    <Badge variant="outline" className="gap-1">
                        Draft
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <Card className="border-border bg-card overflow-hidden">
            <div className="border-b border-border px-4 py-3">
                <h3 className="text-sm font-semibold">Live Campaigns</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                    {allCampaigns.filter((c) => c.status === 'live').length} active campaigns tracking revenue
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                        <TableHead className="text-xs">Destination</TableHead>
                        <TableHead className="text-xs">Links</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs text-right">Simulated Profit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allCampaigns.map((campaign, i) => (
                        <motion.tr
                            key={campaign.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-border hover:bg-accent/50 transition-colors"
                        >
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">{campaign.name}</p>
                                        <p className="text-xs text-muted-foreground">{campaign.destination}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5">
                                    <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm">{campaign.totalLinks}</span>
                                </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                            <TableCell className="text-right">
                                {campaign.simulatedProfit > 0 ? (
                                    <span className="font-mono text-sm font-semibold text-green-400">
                                        ${campaign.simulatedProfit.toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="text-sm text-muted-foreground">—</span>
                                )}
                            </TableCell>
                        </motion.tr>
                    ))}
                    {allCampaigns.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-muted-foreground text-sm">
                                No campaigns yet. Use the Command Bar to create one.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
