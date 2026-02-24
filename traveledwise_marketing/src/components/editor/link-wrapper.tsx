'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Plus, Trash2, ExternalLink, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCampaignStore } from '@/lib/store/campaign-store';
import { wrapLink } from '@/lib/connectors/travelpayouts';

export function LinkWrapper() {
    const { draft, addAffiliateLink, removeAffiliateLink, setAffiliateLinks } = useCampaignStore();
    const { affiliateLinks } = draft;
    const [newUrl, setNewUrl] = useState('');
    const [newLabel, setNewLabel] = useState('');

    const handleAddLink = () => {
        if (!newUrl.trim()) return;
        const wrapped = wrapLink(newUrl);
        addAffiliateLink({
            id: crypto.randomUUID(),
            originalUrl: newUrl,
            wrappedUrl: wrapped.wrappedUrl,
            label: newLabel || wrapped.platform + ' Link',
            platform: wrapped.platform,
            isWrapped: true,
        });
        setNewUrl('');
        setNewLabel('');
    };

    const handleWrapAll = () => {
        const updated = affiliateLinks.map((link) => {
            if (link.isWrapped) return link;
            const wrapped = wrapLink(link.originalUrl);
            return { ...link, wrappedUrl: wrapped.wrappedUrl, isWrapped: true };
        });
        setAffiliateLinks(updated);
    };

    if (affiliateLinks.length === 0) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground/50">
                <div className="text-center space-y-2">
                    <Link2 className="h-8 w-8 mx-auto opacity-30" />
                    <p>No affiliate links discovered yet</p>
                    <p className="text-xs">AI will find monetizable links during search</p>
                </div>
            </div>
        );
    }

    const wrappedCount = affiliateLinks.filter((l) => l.isWrapped).length;

    return (
        <div className="space-y-4 p-1">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {wrappedCount}/{affiliateLinks.length} links wrapped with affiliate ID
                </span>
                <Button variant="outline" size="sm" onClick={handleWrapAll} className="gap-1.5 text-xs h-7">
                    <Shield className="h-3 w-3" />
                    Wrap All
                </Button>
            </div>

            {/* Links List */}
            <div className="space-y-2">
                <AnimatePresence initial={false}>
                    {affiliateLinks.map((link, i) => (
                        <motion.div
                            key={link.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Card className="border-border bg-card p-3">
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${link.isWrapped ? 'bg-green-500/10' : 'bg-yellow-500/10'
                                        }`}>
                                        {link.isWrapped
                                            ? <Check className="h-3.5 w-3.5 text-green-400" />
                                            : <Link2 className="h-3.5 w-3.5 text-yellow-400" />
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{link.label}</span>
                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                {link.platform}
                                            </Badge>
                                        </div>
                                        <p className="mt-1 truncate text-xs text-muted-foreground font-mono">
                                            {link.isWrapped ? link.wrappedUrl : link.originalUrl}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                                        onClick={() => removeAffiliateLink(link.id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Add New Link */}
            <Card className="border-dashed border-border bg-card/50 p-3">
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Paste affiliate URL..."
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="h-8 text-xs bg-background/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Link label (optional)"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            className="h-8 text-xs bg-background/50"
                        />
                        <Button size="sm" onClick={handleAddLink} className="h-8 gap-1 text-xs">
                            <Plus className="h-3 w-3" />
                            Add
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
