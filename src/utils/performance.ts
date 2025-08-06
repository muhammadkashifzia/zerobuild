import { client } from '@/sanity/lib/client'
import { performanceQuery } from '@/sanity/lib/queries'
import type { Performance } from '@/types/performance'

export async function getPerformanceData(): Promise<Performance | null> {
  try {
    const performance = await client.fetch(performanceQuery)
    return performance
  } catch (error) {
    console.error('Error fetching performance data:', error)
    return null
  }
} 