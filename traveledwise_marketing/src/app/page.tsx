'use client';

import { motion } from 'framer-motion';
import { CommandBar } from '@/components/command-bar/command-bar';
import { TrendsGrid } from '@/components/trends/trends-grid';
import { ProfitTracker } from '@/components/dashboard/profit-tracker';
import { CampaignsTable } from '@/components/dashboard/campaigns-table';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="gradient-text">CMO</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time travel intelligence. Search, create, and deploy campaigns backed by Google Trends data.
        </p>
      </motion.div>

      {/* Command Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CommandBar />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ProfitTracker />
      </motion.div>

      <Separator className="bg-border" />

      {/* Trends */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TrendsGrid />
      </motion.div>

      <Separator className="bg-border" />

      {/* Campaigns Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CampaignsTable />
      </motion.div>
    </div>
  );
}
