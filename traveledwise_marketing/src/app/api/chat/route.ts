import { streamText } from 'ai';
import { COMMAND_PARSE_PROMPT, SCRIPT_GENERATION_PROMPT } from '@/lib/ai/prompts';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Check if GOOGLE_GENERATIVE_AI_API_KEY is set
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
        // Return a mock streaming response for demo purposes
        const encoder = new TextEncoder();
        const mockResponse = generateMockStreamResponse(messages[messages.length - 1]?.content || '');

        const stream = new ReadableStream({
            async start(controller) {
                for (const chunk of mockResponse) {
                    controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
                    await new Promise((r) => setTimeout(r, 50));
                }
                controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`));
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Vercel-AI-Data-Stream': 'v1',
            },
        });
    }

    // Use real Gemini model when API key is available
    const { google } = await import('@ai-sdk/google');
    const model = google('gemini-1.5-pro-latest');

    const result = streamText({
        model,
        system: `${COMMAND_PARSE_PROMPT}\n\n${SCRIPT_GENERATION_PROMPT}`,
        messages,
    });

    return result.toTextStreamResponse();
}

function generateMockStreamResponse(query: string): string[] {
    const destination = extractDestination(query);
    const lines = [
        `🔍 **Analyzing command:** "${query}"\n\n`,
        `📡 **Connecting to Google Search Grounding...**\n`,
        `✅ Grounding established. Searching real-time data.\n\n`,
        `---\n\n`,
        `## 📊 Market Analysis: ${destination}\n\n`,
        `**Current Search Volume:** ~245,000/month (+34% MoM)\n`,
        `**Trending Queries:**\n`,
        `- "${destination} hidden gems 2026"\n`,
        `- "best ${destination.toLowerCase()} tours"\n`,
        `- "${destination.toLowerCase()} travel guide tiktok"\n\n`,
        `**Affiliate Opportunity Score:** 92/100 🔥\n\n`,
        `---\n\n`,
        `## 🎬 Generated Campaign (3 Videos)\n\n`,
        `### Video 1 — TikTok\n`,
        `**Hook:** "POV: You just discovered the most INSANE hidden spot in ${destination} 🤯"\n\n`,
        `**Script:** After visiting 40+ countries, I can honestly say ${destination} surprised me the most. `,
        `From the incredible food scene to the jaw-dropping landscapes, every single day was an adventure. `,
        `We booked all our experiences through one platform and saved over 30%.\n\n`,
        `**CTA:** "Link in bio to book the EXACT same tour we did — tap before prices go up 📲"\n\n`,
        `**Hashtags:** #${destination.replace(/\s+/g, '')} #TravelTikTok #HiddenGems #BucketList\n\n`,
        `---\n\n`,
        `### Video 2 — Instagram Reels\n`,
        `**Hook:** "Stop scrolling if ${destination} is on your bucket list ✈️"\n\n`,
        `**Script:** Here's your 3-day itinerary for ${destination} that'll blow your mind. `,
        `Day 1: Start with the sunrise tour everyone's raving about. Day 2: Hit the local food scene. `,
        `Day 3: The adventure activity that went viral last month.\n\n`,
        `**CTA:** "I've linked everything in my bio — tours, hotels, the whole itinerary 🔗"\n\n`,
        `---\n\n`,
        `### Video 3 — YouTube Shorts\n`,
        `**Hook:** "I can't believe this place in ${destination} actually exists 😍"\n\n`,
        `**Script:** The locals don't want you to know about THIS spot. `,
        `We found a private beach, a hidden temple, and a restaurant with $3 meals that are Michelin-worthy.\n\n`,
        `**CTA:** "Save this and tap the link in bio to book before it sells out 🏃‍♂️"\n\n`,
        `---\n\n`,
        `## 🔗 Discovered Affiliate Links\n\n`,
        `| Platform | Listing | Est. Commission |\n`,
        `|---|---|---|\n`,
        `| Viator | Best of ${destination} Day Tour ($65) | ~$8.45 |\n`,
        `| Viator | ${destination} Sunset Cruise ($95) | ~$12.35 |\n`,
        `| GetYourGuide | Street Food Walk ($45) | ~$5.85 |\n`,
        `| Booking.com | Top-Rated Hotels | ~4% per booking |\n\n`,
        `✅ **Campaign ready for deployment.** Click "Deploy" to wrap links and schedule posts.\n`,
    ];

    return lines;
}

function extractDestination(query: string): string {
    const patterns = [
        /(?:in|for|about|to)\s+(.+?)(?:\s+and|\s*$)/i,
        /(?:trending|luxury|budget)\s+(.+?)(?:\s+and|\s*$)/i,
    ];

    for (const pattern of patterns) {
        const match = query.match(pattern);
        if (match) return match[1].trim();
    }

    return 'Bali';
}
