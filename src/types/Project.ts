export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { url: string } };
  description?: string;
  categories?: string[];
  gallery?: { asset: { url: string } }[];
  body?: any;
}