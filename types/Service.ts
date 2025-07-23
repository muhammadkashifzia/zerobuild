export interface Service {
  _id: string;
  title: string;
  description?: string;
  slug: {
    current: string;
  };
  categories?: string[];
  image?: string;
}
 