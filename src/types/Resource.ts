export interface Resource {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { url: string } };
  description?: string;
  purpose?: string[];
  focusArea?: string[];
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
 


 
 