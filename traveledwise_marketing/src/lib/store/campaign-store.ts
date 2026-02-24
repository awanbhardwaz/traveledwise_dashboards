import { create } from 'zustand';
import type { Trend, Script, MediaClip, AffiliateLink, Campaign, DeploymentStep, MarketPulseEntry } from '../types';

interface CampaignDraft {
    id: string;
    query: string;
    status: 'idle' | 'searching' | 'drafting' | 'ready' | 'deploying' | 'live';
    destination: string;
    trends: Trend[];
    scripts: Script[];
    mediaClips: MediaClip[];
    affiliateLinks: AffiliateLink[];
    marketPulse: MarketPulseEntry[];
    deploymentSteps: DeploymentStep[];
}

interface CampaignStore {
    // Current draft being worked on
    draft: CampaignDraft;

    // Historical campaigns
    campaigns: Campaign[];

    // UI state
    activeTab: 'script' | 'media' | 'links';
    sidebarOpen: boolean;

    // Draft actions
    setQuery: (query: string) => void;
    setStatus: (status: CampaignDraft['status']) => void;
    setDestination: (destination: string) => void;
    setTrends: (trends: Trend[]) => void;
    setScripts: (scripts: Script[]) => void;
    updateScript: (id: string, updates: Partial<Script>) => void;
    setMediaClips: (clips: MediaClip[]) => void;
    toggleMediaClip: (id: string) => void;
    setAffiliateLinks: (links: AffiliateLink[]) => void;
    addAffiliateLink: (link: AffiliateLink) => void;
    removeAffiliateLink: (id: string) => void;
    addMarketPulse: (entry: MarketPulseEntry) => void;
    clearMarketPulse: () => void;
    setDeploymentSteps: (steps: DeploymentStep[]) => void;
    updateDeploymentStep: (id: string, updates: Partial<DeploymentStep>) => void;

    // Campaign actions
    addCampaign: (campaign: Campaign) => void;
    updateCampaign: (id: string, updates: Partial<Campaign>) => void;

    // UI actions
    setActiveTab: (tab: 'script' | 'media' | 'links') => void;
    setSidebarOpen: (open: boolean) => void;

    // Reset
    resetDraft: () => void;
    hydrateFromTrend: (trend: Trend) => void;
}

const initialDraft: CampaignDraft = {
    id: '',
    query: '',
    status: 'idle',
    destination: '',
    trends: [],
    scripts: [],
    mediaClips: [],
    affiliateLinks: [],
    marketPulse: [],
    deploymentSteps: [],
};

export const useCampaignStore = create<CampaignStore>((set) => ({
    draft: { ...initialDraft },
    campaigns: [],
    activeTab: 'script',
    sidebarOpen: true,

    setQuery: (query) => set((state) => ({ draft: { ...state.draft, query } })),
    setStatus: (status) => set((state) => ({ draft: { ...state.draft, status } })),
    setDestination: (destination) => set((state) => ({ draft: { ...state.draft, destination } })),
    setTrends: (trends) => set((state) => ({ draft: { ...state.draft, trends } })),
    setScripts: (scripts) => set((state) => ({ draft: { ...state.draft, scripts } })),
    updateScript: (id, updates) => set((state) => ({
        draft: {
            ...state.draft,
            scripts: state.draft.scripts.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        },
    })),
    setMediaClips: (clips) => set((state) => ({ draft: { ...state.draft, mediaClips: clips } })),
    toggleMediaClip: (id) => set((state) => ({
        draft: {
            ...state.draft,
            mediaClips: state.draft.mediaClips.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c)),
        },
    })),
    setAffiliateLinks: (links) => set((state) => ({ draft: { ...state.draft, affiliateLinks: links } })),
    addAffiliateLink: (link) => set((state) => ({
        draft: { ...state.draft, affiliateLinks: [...state.draft.affiliateLinks, link] },
    })),
    removeAffiliateLink: (id) => set((state) => ({
        draft: {
            ...state.draft,
            affiliateLinks: state.draft.affiliateLinks.filter((l) => l.id !== id),
        },
    })),
    addMarketPulse: (entry) => set((state) => ({
        draft: { ...state.draft, marketPulse: [...state.draft.marketPulse, entry] },
    })),
    clearMarketPulse: () => set((state) => ({ draft: { ...state.draft, marketPulse: [] } })),
    setDeploymentSteps: (steps) => set((state) => ({ draft: { ...state.draft, deploymentSteps: steps } })),
    updateDeploymentStep: (id, updates) => set((state) => ({
        draft: {
            ...state.draft,
            deploymentSteps: state.draft.deploymentSteps.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        },
    })),

    addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
    updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

    setActiveTab: (activeTab) => set({ activeTab }),
    setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

    resetDraft: () => set({ draft: { ...initialDraft, id: crypto.randomUUID() } }),
    hydrateFromTrend: (trend) => set((state) => ({
        draft: {
            ...state.draft,
            id: crypto.randomUUID(),
            query: `Create campaign for ${trend.name}`,
            destination: trend.name,
            status: 'drafting',
            trends: [trend],
            marketPulse: [
                {
                    id: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                    type: 'system',
                    content: `🎯 Hydrating workspace with trend: ${trend.name}`,
                },
                {
                    id: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                    type: 'grounding',
                    content: `📊 Search volume: ${trend.searchVolume.toLocaleString()} (+${trend.volumeChange}%)`,
                },
                {
                    id: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                    type: 'analysis',
                    content: `🔥 Catalyst: ${trend.whyTrending}`,
                },
                {
                    id: crypto.randomUUID(),
                    timestamp: new Date().toISOString(),
                    type: 'analysis',
                    content: `⚠️ Friction: ${trend.frictionPoint}`,
                },
            ],
        },
    })),
}));
