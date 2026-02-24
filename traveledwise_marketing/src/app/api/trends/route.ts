import { NextRequest, NextResponse } from 'next/server';
import { analyzeTrends } from '@/lib/agent/trends';

export async function GET(req: NextRequest) {
    console.log('GET /api/trends - Request received');
    try {
        const query = req.nextUrl.searchParams.get('q') || undefined;
        console.log(`GET /api/trends - Query: ${query || 'none'}`);
        const trends = await analyzeTrends(query);
        console.log('GET /api/trends - Trends analyzed successfully');
        return NextResponse.json({ trends, updatedAt: new Date().toISOString() });
    } catch (error) {
        console.error('Trends API error:', error);
        return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
    }
}
