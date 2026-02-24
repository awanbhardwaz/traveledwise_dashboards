/**
 * Campaign Agent
 * Orchestrates: parse command → search → generate scripts → find media → discover links.
 * Provides mock campaign generation for demo.
 */

import type { Script, MediaClip, AffiliateLink } from '../types';

export function generateMockScripts(destination: string, count: number = 3): Script[] {
    const platforms: Array<'tiktok' | 'instagram' | 'youtube'> = ['tiktok', 'instagram', 'youtube'];

    const hooks = [
        `POV: You just discovered the most INSANE hidden spot in ${destination} 🤯`,
        `Stop scrolling if ${destination} is on your bucket list ✈️`,
        `I can't believe this place in ${destination} actually exists 😍`,
        `${destination} changed my entire perspective on travel 🌍`,
        `The locals don't want you to know about THIS spot in ${destination} 🤫`,
    ];

    const bodies = [
        `This hidden gem in ${destination} gets barely any tourists, but the views are absolutely unreal. We booked a private tour through Viator and our guide took us to spots you won't find on Google. The best part? It only costs a fraction of what you'd expect.`,
        `After visiting 40+ countries, I can honestly say ${destination} surprised me the most. From the incredible food scene to the jaw-dropping landscapes, every single day was an adventure. We booked all our experiences through one platform and saved over 30%.`,
        `Here's your 3-day itinerary for ${destination} that'll blow your mind. Day 1: Start with this sunrise tour everyone's raving about. Day 2: Hit the local food scene with a guided tasting tour. Day 3: The adventure activity that went viral last month.`,
    ];

    const ctas = [
        `Link in bio to book the EXACT same tour we did — and use our link for exclusive pricing 🔗`,
        `I've linked everything in my bio — tours, hotels, the whole itinerary. Tap the link before prices go up 📲`,
        `Save this and tap the link in bio to book before it sells out. Seriously, this tour has a 3-week waitlist 🏃‍♂️`,
    ];

    return Array.from({ length: Math.min(count, 3) }, (_, i) => ({
        id: `script_${crypto.randomUUID().slice(0, 8)}`,
        platform: platforms[i % platforms.length],
        hook: hooks[i % hooks.length],
        body: bodies[i % bodies.length],
        cta: ctas[i % ctas.length],
        duration: 30 + i * 5,
        hashtags: [
            `#${destination.replace(/\s+/g, '')}`,
            '#TravelTikTok',
            '#HiddenGems',
            '#TravelGuide',
            `#${destination.replace(/\s+/g, '')}Travel`,
            '#BucketList',
            '#LinkInBio',
        ],
    }));
}

export function generateMockMedia(destination: string): MediaClip[] {
    return [
        {
            id: `media_${crypto.randomUUID().slice(0, 8)}`,
            url: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
            title: `${destination} — Aerial Beach View`,
            duration: 15,
            source: 'Pexels',
            selected: true,
        },
        {
            id: `media_${crypto.randomUUID().slice(0, 8)}`,
            url: 'https://videos.pexels.com/video-files/2169880/2169880-hd_1920_1080_30fps.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400',
            title: `${destination} — Luxury Resort`,
            duration: 12,
            source: 'Pexels',
            selected: true,
        },
        {
            id: `media_${crypto.randomUUID().slice(0, 8)}`,
            url: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400',
            title: `${destination} — Local Experience`,
            duration: 18,
            source: 'Pexels',
            selected: true,
        },
        {
            id: `media_${crypto.randomUUID().slice(0, 8)}`,
            url: 'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400',
            title: `${destination} — Sunset Scene`,
            duration: 10,
            source: 'Pexels',
            selected: false,
        },
        {
            id: `media_${crypto.randomUUID().slice(0, 8)}`,
            url: 'https://videos.pexels.com/video-files/3629519/3629519-hd_1920_1080_24fps.mp4',
            thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
            title: `${destination} — Food & Culture`,
            duration: 14,
            source: 'Pexels',
            selected: false,
        },
    ];
}

export function generateMockLinks(destination: string): AffiliateLink[] {
    return [
        {
            id: `link_${crypto.randomUUID().slice(0, 8)}`,
            originalUrl: `https://www.viator.com/tours/${destination.replace(/\s+/g, '-')}/best-of`,
            wrappedUrl: '',
            label: `Best of ${destination} Full-Day Tour`,
            platform: 'Viator',
            isWrapped: false,
        },
        {
            id: `link_${crypto.randomUUID().slice(0, 8)}`,
            originalUrl: `https://www.viator.com/tours/${destination.replace(/\s+/g, '-')}/sunset-cruise`,
            wrappedUrl: '',
            label: `${destination} Premium Sunset Cruise`,
            platform: 'Viator',
            isWrapped: false,
        },
        {
            id: `link_${crypto.randomUUID().slice(0, 8)}`,
            originalUrl: `https://www.getyourguide.com/${destination.replace(/\s+/g, '-')}/food-tour`,
            wrappedUrl: '',
            label: `${destination} Street Food & Culture Walk`,
            platform: 'GetYourGuide',
            isWrapped: false,
        },
        {
            id: `link_${crypto.randomUUID().slice(0, 8)}`,
            originalUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`,
            wrappedUrl: '',
            label: `Top-Rated Hotels in ${destination}`,
            platform: 'Booking.com',
            isWrapped: false,
        },
    ];
}
