export interface ServicesBanner {
  _id: string;
  title: string;
  description: string;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export interface CtaBox {
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image?: { asset: { url: string } };
  description?: string;
  disciplines?: string[];
  projectStage?: string[];
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
 

 