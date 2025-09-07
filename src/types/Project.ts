export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { url: string } };
  description?: string;
  location?: string;
  categories?: string[];
  gallery?: { asset: { url: string } }[];
  body?: any;
    accordion?: AccordionItem[];
}
export interface AccordionItem {
  _key: string;
  title: string;
  content: any;
  isOpen?: boolean;
}

export interface ProjectsBanner {
  _id: string;
  title: string;
  description: string;
}