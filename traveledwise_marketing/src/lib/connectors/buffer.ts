/**
 * Mock Buffer Connector
 * In production, this would call the Buffer API to schedule social media posts.
 */

interface SchedulePostRequest {
    platform: 'tiktok' | 'instagram' | 'youtube';
    caption: string;
    hashtags: string[];
    videoUrl: string;
    scheduledAt?: string;
}

interface SchedulePostResult {
    id: string;
    status: 'scheduled';
    platform: string;
    scheduledAt: string;
    profileName: string;
}

export async function schedulePost(request: SchedulePostRequest): Promise<SchedulePostResult> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const scheduledAt = request.scheduledAt || new Date(Date.now() + 3600000).toISOString();

    return {
        id: `buf_${crypto.randomUUID().slice(0, 8)}`,
        status: 'scheduled',
        platform: request.platform,
        scheduledAt,
        profileName: `@traveledwise_${request.platform}`,
    };
}

export async function getProfiles() {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [
        { id: 'prof_01', platform: 'tiktok', name: '@traveledwise_tiktok', followers: 45200 },
        { id: 'prof_02', platform: 'instagram', name: '@traveledwise_ig', followers: 128500 },
        { id: 'prof_03', platform: 'youtube', name: '@TravelEdWise', subscribers: 32100 },
    ];
}
