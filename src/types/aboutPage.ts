export interface AboutPageBanner {
  _id: string;
  title: string;
  description: string;
  introText?: string;
  introImage?: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
  introImageAlt?: string;
}
