import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { youtubeVideosQuery } from '@/sanity/lib/queries';

export async function GET() {
  try {
    const videos = await client.fetch(youtubeVideosQuery);
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
} 