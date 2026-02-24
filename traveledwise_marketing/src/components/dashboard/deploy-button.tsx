'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Check, Loader2, Link2, Film, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCampaignStore } from '@/lib/store/campaign-store';
import type { DeploymentStep } from '@/lib/types';

export function DeployButton() {
    const { draft, setStatus, setDeploymentSteps, updateDeploymentStep, addCampaign, addMarketPulse } = useCampaignStore();
    const [isDeploying, setIsDeploying] = useState(false);

    const canDeploy = draft.status === 'ready' && draft.scripts.length > 0;

    const handleDeploy = async () => {
        if (!canDeploy) return;
        setIsDeploying(true);
        setStatus('deploying');

        const steps: DeploymentStep[] = [
            { id: 'wrap', label: 'Wrapping affiliate links with Travelpayouts ID', status: 'pending' },
            { id: 'render', label: 'Rendering video via Creatomate', status: 'pending' },
            { id: 'schedule', label: 'Scheduling posts via Buffer', status: 'pending' },
            { id: 'track', label: 'Setting up tracking & analytics', status: 'pending' },
        ];
        setDeploymentSteps(steps);

        // Simulate deployment steps
        for (let i = 0; i < steps.length; i++) {
            updateDeploymentStep(steps[i].id, { status: 'running' });
            addMarketPulse({
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                type: 'system',
                content: `🔄 ${steps[i].label}...`,
            });
            await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));
            updateDeploymentStep(steps[i].id, { status: 'done', detail: getStepDetail(steps[i].id) });
            addMarketPulse({
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                type: 'system',
                content: `✅ ${steps[i].label} — Complete`,
            });
        }

        // Add campaign to live campaigns
        addCampaign({
            id: crypto.randomUUID(),
            name: `${draft.destination} Campaign`,
            destination: draft.destination,
            status: 'live',
            scripts: draft.scripts,
            mediaClips: draft.mediaClips,
            affiliateLinks: draft.affiliateLinks,
            totalLinks: draft.affiliateLinks.length,
            simulatedProfit: Math.round(Math.random() * 500 + 200),
            createdAt: new Date().toISOString(),
            deployedAt: new Date().toISOString(),
        });

        setStatus('live');
        setIsDeploying(false);

        addMarketPulse({
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            type: 'system',
            content: `🎉 Campaign "${draft.destination}" is now LIVE! Tracking simulated revenue...`,
        });
    };

    const getStepIcon = (status: string) => {
        switch (status) {
            case 'done': return <Check className="h-4 w-4 text-green-400" />;
            case 'running': return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
            default: return <div className="h-4 w-4 rounded-full border border-muted-foreground/30" />;
        }
    };

    return (
        <div className="space-y-3">
            <motion.div whileHover={canDeploy ? { scale: 1.02 } : {}} whileTap={canDeploy ? { scale: 0.98 } : {}}>
                <Button
                    onClick={handleDeploy}
                    disabled={!canDeploy || isDeploying}
                    className="w-full gap-2 h-11 bg-gradient-to-r from-primary to-[oklch(0.7_0.18_170)] hover:opacity-90 text-primary-foreground font-semibold"
                    size="lg"
                >
                    {isDeploying ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Deploying...
                        </>
                    ) : draft.status === 'live' ? (
                        <>
                            <Check className="h-4 w-4" />
                            Campaign Live!
                        </>
                    ) : (
                        <>
                            <Rocket className="h-4 w-4" />
                            One-Click Deploy
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Deployment Steps */}
            <AnimatePresence>
                {draft.deploymentSteps.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="border-border bg-card p-3 space-y-2">
                            {draft.deploymentSteps.map((step, i) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    {getStepIcon(step.status)}
                                    <span className={`text-xs flex-1 ${step.status === 'done' ? 'text-muted-foreground' : 'text-foreground'}`}>
                                        {step.label}
                                    </span>
                                    {step.detail && (
                                        <span className="text-[10px] text-muted-foreground">{step.detail}</span>
                                    )}
                                </motion.div>
                            ))}
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function getStepDetail(stepId: string): string {
    switch (stepId) {
        case 'wrap': return '4 links wrapped';
        case 'render': return 'MP4 • 45s';
        case 'schedule': return '3 platforms';
        case 'track': return 'ID: camp_xxxx';
        default: return '';
    }
}
