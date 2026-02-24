'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    TrendingUp,
    Film,
    Settings,
    Zap,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCampaignStore } from '@/lib/store/campaign-store';
import { cn } from '@/lib/utils';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/trends', label: 'Trends', icon: TrendingUp },
    { href: '/campaigns', label: 'Campaigns', icon: Film },
    { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen } = useCampaignStore();

    return (
        <motion.aside
            initial={false}
            animate={{ width: sidebarOpen ? 240 : 72 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar"
        >
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-border px-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                {sidebarOpen && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-bold gradient-text whitespace-nowrap"
                    >
                        TravelEdWise CMO
                    </motion.span>
                )}
            </div>

            {/* Nav Items */}
            <nav className="flex flex-1 flex-col gap-1 p-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="border-t border-border p-3">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-full justify-center"
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </motion.aside>
    );
}
