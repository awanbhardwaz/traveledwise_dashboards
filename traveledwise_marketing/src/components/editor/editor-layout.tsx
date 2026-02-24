'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketPulse } from './market-pulse';
import { ScriptEditor } from './script-editor';
import { MediaPicker } from './media-picker';
import { LinkWrapper } from './link-wrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCampaignStore } from '@/lib/store/campaign-store';
import { FileText, Film, Link2 } from 'lucide-react';

export function EditorLayout() {
    const { activeTab, setActiveTab, draft } = useCampaignStore();

    return (
        <div className="grid h-[calc(100vh-16rem)] grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Left Panel — Market Pulse Terminal */}
            <div className="min-h-[400px]">
                <MarketPulse />
            </div>

            {/* Right Panel — Editable Content */}
            <div className="flex flex-col min-h-[400px] rounded-xl border border-border bg-card overflow-hidden">
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as 'script' | 'media' | 'links')}
                    className="flex flex-col h-full"
                >
                    <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-4 h-11">
                        <TabsTrigger
                            value="script"
                            className="gap-1.5 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                            <FileText className="h-3.5 w-3.5" />
                            Scripts
                            {draft.scripts.length > 0 && (
                                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                                    {draft.scripts.length}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="media"
                            className="gap-1.5 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                            <Film className="h-3.5 w-3.5" />
                            Media
                            {draft.mediaClips.length > 0 && (
                                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                                    {draft.mediaClips.filter((c) => c.selected).length}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="links"
                            className="gap-1.5 text-xs data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                        >
                            <Link2 className="h-3.5 w-3.5" />
                            Links
                            {draft.affiliateLinks.length > 0 && (
                                <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                                    {draft.affiliateLinks.length}
                                </span>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex-1 overflow-y-auto p-3">
                        <TabsContent value="script" className="mt-0 h-full">
                            <ScriptEditor />
                        </TabsContent>
                        <TabsContent value="media" className="mt-0 h-full">
                            <MediaPicker />
                        </TabsContent>
                        <TabsContent value="links" className="mt-0 h-full">
                            <LinkWrapper />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
