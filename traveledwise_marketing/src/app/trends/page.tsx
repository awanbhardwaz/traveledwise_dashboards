'use client';

import { motion } from 'framer-motion';
import { TrendsGrid } from '@/components/trends/trends-grid';

export default function TrendsPage() {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
            >
                <h1 className="text-2xl font-bold">
                    Trends <span className="gradient-text">Monitor</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                    Real-time travel trends powered by AI with Google Search grounding. Click any trend to start a campaign.
                </p>
            </motion.div>

            <TrendsGrid />
        </div>
    );
}
