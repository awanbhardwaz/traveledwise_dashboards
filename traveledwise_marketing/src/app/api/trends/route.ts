import { NextRequest, NextResponse } from 'next/server';
import { analyzeTrends } from '@/lib/agent/trends';

export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams.get('q') || undefined;
        const trends = await analyzeTrends(query);
        return NextResponse.json({ trends, updatedAt: new Date().toISOString() });
    } catch (error) {
        console.error('Trends API error:', error);
        return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
    }
}
