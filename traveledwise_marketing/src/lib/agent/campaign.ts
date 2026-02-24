/**
 * Campaign Agent
 * Orchestrates: parse command → search → generate scripts → find media → discover links.
 * Now supports real data injection from Grounded AI.
 */

import type { Script, MediaClip, AffiliateLink } from '../types';

export function createScriptsFromAI(destination: string, aiData: any[]): Script[] {
    return aiData.map((data, i) => ({
        id: `script_${Date.now()}_${i}`,
        platform: data.platform || (['tiktok', 'instagram', 'youtube'][i % 3] as any),
        hook: data.hook || `POV: You're in ${destination}`,
        body: data.body || `Discovering the best of ${destination}.`,
        cta: data.cta || `Check out the link in my bio to book this!`,
        duration: data.duration || 30,
        hashtags: data.hashtags || [`#${destination.replace(/\s+/g, '')}`, '#travel'],
    }));
}

export function createLinksFromAI(aiLinks: any[]): AffiliateLink[] {
    return aiLinks.map((link, i) => ({
        id: `link_${Date.now()}_${i}`,
        originalUrl: link.url || link.originalUrl || '',
        wrappedUrl: '',
        label: link.title || link.label || 'View Experience',
        platform: link.platform || 'Travel',
        isWrapped: false,
    }));
}

/**
 * Fallback generator that creates slightly more realistic links than before
 * by searching for destination name.
 */
export function generateMockLinks(destination: string): AffiliateLink[] {
    return [
        {
            id: `link_${Date.now()}_0`,
            originalUrl: `https://www.viator.com/search/${encodeURIComponent(destination)}?mcid=42383`,
            wrappedUrl: '',
            label: `Top Rated Tours in ${destination}`,
            platform: 'Viator',
            isWrapped: false,
        },
        {
            id: `link_${Date.now()}_1`,
            originalUrl: `https://www.getyourguide.com/s/?q=${encodeURIComponent(destination)}`,
            wrappedUrl: '',
            label: `Popular Activities in ${destination}`,
            platform: 'GetYourGuide',
            isWrapped: false,
        },
        {
            id: `link_${Date.now()}_2`,
            originalUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`,
            wrappedUrl: '',
            label: `Best Hotels in ${destination}`,
            platform: 'Booking.com',
            isWrapped: false,
        },
    ];
}

export function generateMockScripts(destination: string, count: number = 3): Script[] {
    const platforms: Array<'tiktok' | 'instagram' | 'youtube'> = ['tiktok', 'instagram', 'youtube'];
    return Array.from({ length: count }, (_, i) => ({
        id: `script_${Date.now()}_${i}`,
        platform: platforms[i % platforms.length],
        hook: `Stop scrolling if ${destination} is on your 2026 bucket list ✈️`,
        body: `We just found the most insane hidden gem in ${destination}. Not many people know about this spot yet, but it's becoming the next viral destination. The vibes are unmatched and it's surprisingly affordable.`,
        cta: `Tap the link in my bio to book the exact tour we took! 🔗`,
        duration: 35,
        hashtags: [`#${destination}`, '#TravelDiscovery', '#HiddenGems', '#TravelEdWise'],
    }));
}

export function generateMockMedia(destination: string): MediaClip[] {
    return [
        {
            id: `media_${Date.now()}_0`,
            url: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
            thumbnailUrl: `https://loremflickr.com/400/300/travel,beach,${encodeURIComponent(destination)}`,
            title: `${destination} Mood Video`,
            duration: 15,
            source: 'Pexels',
            selected: true,
        },
        {
            id: `media_${Date.now()}_1`,
            url: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
            thumbnailUrl: `https://loremflickr.com/400/300/travel,luxury,${encodeURIComponent(destination)}`,
            title: `${destination} Luxury Scene`,
            duration: 12,
            source: 'Pexels',
            selected: true,
        },
    ];
}
