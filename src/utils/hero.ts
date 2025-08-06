import { client } from '@/sanity/lib/client'
import { heroQuery } from '@/sanity/lib/queries'
import type { Hero } from '@/types/hero'

export async function getHeroData(): Promise<Hero | null> {
  try {
    const hero = await client.fetch(heroQuery)
    return hero
  } catch (error) {
    console.error('Error fetching hero data:', error)
    return null
  }
} 