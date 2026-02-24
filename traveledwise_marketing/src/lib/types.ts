// ===== CORE TYPES =====

export interface Trend {
    id: string;
    name: string;
    searchVolume: number;
    volumeChange: number; // percentage
    topTours: ViatorTour[];
    revenueScore: number; // 0-100
    category: string;
    region: string;
    imageUrl: string;
    updatedAt: string;
}

export interface ViatorTour {
    id: string;
    title: string;
    price: number;
    rating: number;
    reviewCount: number;
    url: string;
    imageUrl: string;
}

export interface Script {
    id: string;
    platform: 'tiktok' | 'instagram' | 'youtube';
    hook: string;
    body: string;
    cta: string;
    duration: number; // seconds
    hashtags: string[];
}

export interface MediaClip {
    id: string;
    url: string;
    thumbnailUrl: string;
    title: string;
    duration: number;
    source: string;
    selected: boolean;
}

export interface AffiliateLink {
    id: string;
    originalUrl: string;
    wrappedUrl: string;
    label: string;
    platform: string;
    isWrapped: boolean;
}

export interface Campaign {
    id: string;
    name: string;
    destination: string;
    status: 'draft' | 'rendering' | 'scheduled' | 'live' | 'completed';
    scripts: Script[];
    mediaClips: MediaClip[];
    affiliateLinks: AffiliateLink[];
    totalLinks: number;
    simulatedProfit: number;
    createdAt: string;
    deployedAt?: string;
}

export interface DeploymentStep {
    id: string;
    label: string;
    status: 'pending' | 'running' | 'done' | 'error';
    detail?: string;
}

export interface MarketPulseEntry {
    id: string;
    timestamp: string;
    type: 'search' | 'grounding' | 'analysis' | 'generation' | 'system';
    content: string;
}
