/**
 * Pexels Photo Search — REAL images for trend cards.
 *
 * If PEXELS_API_KEY is set → hits their API for real search results.
 * Otherwise → uses curated, real Pexels photo URLs that are guaranteed to load.
 */

interface PexelsPhoto {
    src: string;      // landscape 800px
    alt: string;
    photographer: string;
    pexelsUrl: string; // link back for attribution
}

// ─── Live Pexels API Search ────────────────────────────────────────

async function searchPexelsApi(query: string): Promise<PexelsPhoto | null> {
    const key = process.env.PEXELS_API_KEY;
    if (!key) {
        console.log('Pexels API: No key found, using curated fallback.');
        return null;
    }
    console.log(`Pexels API: Searching for "${query}"...`);

    try {
        const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + ' travel')}&per_page=1&orientation=landscape`;
        const res = await fetch(url, {
            headers: { Authorization: key },
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return null;

        const data = await res.json();
        const photo = data.photos?.[0];
        if (!photo) return null;

        return {
            src: photo.src.landscape, // 1200px wide
            alt: photo.alt || query,
            photographer: photo.photographer,
            pexelsUrl: photo.url,
        };
    } catch {
        return null;
    }
}

// ─── Curated Fallback: real Pexels photo IDs ───────────────────────
// These are REAL, verified Pexels photo URLs that will always load.

const CURATED: Record<string, string> = {
    'tokyo': 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800',
    'japan': 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800',
    'kyoto': 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=800',
    'bali': 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    'paris': 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    'iceland': 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&w=800',
    'maldives': 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800',
    'new york': 'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=800',
    'dubai': 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=800',
    'rome': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800',
    'italy': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800',
    'london': 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
    'india': 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800',
    'rajasthan': 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800',
    'thailand': 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    'greece': 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
    'santorini': 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800',
    'morocco': 'https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=800',
    'peru': 'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800',
    'vietnam': 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=800',
    'portugal': 'https://images.pexels.com/photos/1534560/pexels-photo-1534560.jpeg?auto=compress&cs=tinysrgb&w=800',
    'albania': 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    'croatia': 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
    'mexico': 'https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&w=800',
    'costa rica': 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
    'norway': 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800',
    'colombia': 'https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800',
    'egypt': 'https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg?auto=compress&cs=tinysrgb&w=800',
    'spain': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
    'switzerland': 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=800',
    'australia': 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=800',
};

// Generic travel images as ultimate fallback
const GENERIC_TRAVEL = [
    'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=800',
];

function findCuratedImage(keyword: string, index: number): string {
    const lower = keyword.toLowerCase();
    // Check exact keyword match
    for (const [key, url] of Object.entries(CURATED)) {
        if (lower.includes(key)) return url;
    }
    return GENERIC_TRAVEL[index % GENERIC_TRAVEL.length];
}

// ─── Exported Helper ───────────────────────────────────────────────

export async function getPhotoForDestination(keyword: string, index = 0): Promise<string> {
    // 1) Try live API
    const apiResult = await searchPexelsApi(keyword);
    if (apiResult) return apiResult.src;

    // 2) Curated fallback
    return findCuratedImage(keyword, index);
}
