import { NextResponse } from 'next/server';
import { renderVideo } from '@/lib/connectors/creatomate';
import { schedulePost } from '@/lib/connectors/buffer';
import { wrapLinks } from '@/lib/connectors/travelpayouts';

export async function POST(req: Request) {
    try {
        const { scripts, mediaUrls, affiliateLinks, destination } = await req.json();

        // Step 1: Wrap affiliate links
        const originalUrls = affiliateLinks.map((l: { originalUrl: string }) => l.originalUrl);
        const wrappedLinks = wrapLinks(originalUrls);

        // Step 2: Render video via Creatomate
        const videoResult = await renderVideo({
            scripts: scripts.map((s: { hook: string; body: string; cta: string }) => ({
                hook: s.hook,
                body: s.body,
                cta: s.cta,
            })),
            mediaUrls: mediaUrls || [],
        });

        // Step 3: Schedule posts via Buffer
        const scheduledPosts = await Promise.all(
            (scripts as { platform: 'tiktok' | 'instagram' | 'youtube'; hook: string; hashtags: string[] }[]).map(
                (script) =>
                    schedulePost({
                        platform: script.platform,
                        caption: script.hook,
                        hashtags: script.hashtags || [],
                        videoUrl: videoResult.url,
                    })
            )
        );

        return NextResponse.json({
            success: true,
            deployment: {
                wrappedLinks,
                video: videoResult,
                scheduledPosts,
                campaignId: `camp_${crypto.randomUUID().slice(0, 8)}`,
                destination,
                deployedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error('Deploy API error:', error);
        return NextResponse.json({ error: 'Deployment failed' }, { status: 500 });
    }
}
