'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Key, Globe, Video, Calendar, ExternalLink } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-2xl">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
            >
                <h1 className="text-2xl font-bold">
                    <span className="gradient-text">Settings</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                    Configure your API keys and integrations
                </p>
            </motion.div>

            {/* API Keys */}
            <Card className="border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">API Keys</h3>
                </div>
                <Separator />
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                            Google Generative AI API Key
                        </label>
                        <Input
                            type="password"
                            placeholder="Enter your Gemini API key..."
                            className="bg-background/50"
                        />
                        <p className="mt-1 text-[10px] text-muted-foreground">
                            Required for real AI-powered search grounding. Without it, mock data is used.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Integrations */}
            <Card className="border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">Integrations</h3>
                </div>
                <Separator />
                <div className="space-y-3">
                    {[
                        { name: 'Travelpayouts', icon: '💰', status: 'Mock', desc: 'Affiliate link wrapping' },
                        { name: 'Creatomate', icon: '🎬', status: 'Mock', desc: 'Video rendering' },
                        { name: 'Buffer', icon: '📅', status: 'Mock', desc: 'Social media scheduling' },
                        { name: 'Pexels', icon: '📸', status: 'Mock', desc: 'Stock video search' },
                    ].map((integration) => (
                        <div key={integration.name} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{integration.icon}</span>
                                <div>
                                    <p className="text-sm font-medium">{integration.name}</p>
                                    <p className="text-xs text-muted-foreground">{integration.desc}</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-500/20">
                                {integration.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Affiliate Settings */}
            <Card className="border-border bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold">Affiliate Settings</h3>
                </div>
                <Separator />
                <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        Travelpayouts Affiliate ID
                    </label>
                    <Input
                        defaultValue="INSERT_ID"
                        className="bg-background/50 font-mono"
                    />
                </div>
            </Card>
        </div>
    );
}
