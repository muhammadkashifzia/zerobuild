export interface Resource {
  _id: string;
  title: string;
  publishedAt: string;
  image?: { asset: { url: string } };
  description?: string;

}
 

 