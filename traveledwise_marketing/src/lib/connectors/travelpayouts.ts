/**
 * Mock Travelpayouts Link Connector
 * In production, this would use the Travelpayouts API to wrap affiliate links.
 */

const DEFAULT_AFFILIATE_ID = 'INSERT_ID';

interface WrapLinkResult {
    originalUrl: string;
    wrappedUrl: string;
    affiliateId: string;
    platform: string;
}

export function wrapLink(url: string, affiliateId: string = DEFAULT_AFFILIATE_ID): WrapLinkResult {
    const separator = url.includes('?') ? '&' : '?';
    const wrappedUrl = `${url}${separator}a_aid=${affiliateId}&tp_marker=traveledwise`;

    const platform = detectPlatform(url);

    return {
        originalUrl: url,
        wrappedUrl,
        affiliateId,
        platform,
    };
}

export function wrapLinks(urls: string[], affiliateId: string = DEFAULT_AFFILIATE_ID): WrapLinkResult[] {
    return urls.map((url) => wrapLink(url, affiliateId));
}

function detectPlatform(url: string): string {
    if (url.includes('viator.com')) return 'Viator';
    if (url.includes('booking.com')) return 'Booking.com';
    if (url.includes('getyourguide.com')) return 'GetYourGuide';
    if (url.includes('tripadvisor.com')) return 'TripAdvisor';
    if (url.includes('expedia.com')) return 'Expedia';
    if (url.includes('airbnb.com')) return 'Airbnb';
    return 'Other';
}

export function generateTrackingUrl(destination: string, campaignId: string): string {
    return `https://tp.media/r?marker=traveledwise&trs=228719&p=4114&u=https%3A%2F%2Fwww.viator.com%2Fsearch%2F${encodeURIComponent(destination)}&campaign=${campaignId}`;
}
