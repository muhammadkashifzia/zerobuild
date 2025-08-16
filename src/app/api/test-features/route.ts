import { NextResponse } from 'next/server';
import { getFeatures } from '@/sanity/sanity-utils';

export async function GET() {
  try {
    const features = await getFeatures();
    console.log('API: Features fetched successfully:', features);
    
    return NextResponse.json({
      success: true,
      count: features?.length || 0,
      features: features || [],
      message: 'Features fetched successfully'
    });
  } catch (error) {
    console.error('API: Error fetching features:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to fetch features'
    }, { status: 500 });
  }
}
