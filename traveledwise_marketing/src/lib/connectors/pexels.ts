/**
 * Mock Pexels Video API Connector
 * In production, this would call the Pexels API for stock video search.
 */

import type { MediaClip } from '../types';

const MOCK_VIDEOS: Record<string, MediaClip[]> = {
    default: [
        {
            id: 'px_001',
            url: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
            thumbnailUrl: 'https://images.pexels.com/videos/3015510/free-video-3015510.jpg?auto=compress&cs=tinysrgb&w=400',
            title: 'Aerial Ocean Beach Sunset',
            duration: 15,
            source: 'Pexels',
            selected: true,
        },
        {
            id: 'px_002',
            url: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
            thumbnailUrl: 'https://images.pexels.com/videos/2169880/free-video-2169880.jpg?auto=compress&cs=tinysrgb&w=400',
            title: 'Tropical Resort Pool',
            duration: 12,
            source: 'Pexels',
            selected: true,
        },
        {
            id: 'px_003',
            url: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
            thumbnailUrl: 'https://images.pexels.com/videos/3571264/free-video-3571264.jpg?auto=compress&cs=tinysrgb&w=400',
            title: 'Mountain Hiking Adventure',
            duration: 18,
            source: 'Pexels',
            selected: false,
        },
        {
            id: 'px_004',
            url: 'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
            thumbnailUrl: 'https://images.pexels.com/videos/1093662/free-video-1093662.jpg?auto=compress&cs=tinysrgb&w=400',
            title: 'City Skyline at Night',
            duration: 10,
            source: 'Pexels',
            selected: false,
        },
        {
            id: 'px_005',
            url: 'https://videos.pexels.com/video-files/3629519/3629519-hd_1920_1080_24fps.mp4',
            thumbnailUrl: 'https://images.pexels.com/videos/3629519/free-video-3629519.jpg?auto=compress&cs=tinysrgb&w=400',
            title: 'Local Food Market Tour',
            duration: 14,
            source: 'Pexels',
            selected: true,
        },
        {
            id: 'px_006',
            url: 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4',
            thumbnailUrl: 'https://images.pexels.com/videos/4763824/free-video-4763824.jpg?auto=compress&cs=tinysrgb&w=400',
            title: 'Luxury Villa Walkthrough',
            duration: 20,
            source: 'Pexels',
            selected: false,
        },
    ],
};

export async function searchVideos(query: string): Promise<MediaClip[]> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const clips = MOCK_VIDEOS.default.map((clip) => ({
        ...clip,
        id: `px_${crypto.randomUUID().slice(0, 8)}`,
        title: `${clip.title} — ${query}`,
    }));

    return clips;
}
