/**
 * Mock Creatomate Connector
 * In production, this would call the Creatomate API to render videos.
 */

interface VideoRenderRequest {
    templateId?: string;
    scripts: { hook: string; body: string; cta: string }[];
    mediaUrls: string[];
    overlayText?: string;
}

interface VideoRenderResult {
    id: string;
    status: 'completed';
    url: string;
    thumbnailUrl: string;
    duration: number;
    format: string;
}

export async function renderVideo(request: VideoRenderRequest): Promise<VideoRenderResult> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
        id: `cr_${crypto.randomUUID().slice(0, 8)}`,
        status: 'completed',
        url: `https://cdn.creatomate.com/renders/mock-${Date.now()}.mp4`,
        thumbnailUrl: `https://cdn.creatomate.com/thumbnails/mock-${Date.now()}.jpg`,
        duration: request.scripts.reduce((sum, s) => sum + 15, 0),
        format: 'mp4',
    };
}

export async function getTemplates() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
        { id: 'tpl_tiktok_01', name: 'TikTok Vertical - Travel', ratio: '9:16' },
        { id: 'tpl_reels_01', name: 'Instagram Reels - Luxury', ratio: '9:16' },
        { id: 'tpl_shorts_01', name: 'YouTube Shorts - Adventure', ratio: '9:16' },
    ];
}
