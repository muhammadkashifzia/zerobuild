export interface Contact {
  address?: string;
  phone?: string;
  email?: string
}
 
export interface ContactPageBanner {
  _id?: string;
  title?: string;
  description?: string;
  cta?: { note?: string };
  isActive?: boolean;
  contacts?: Contact[];
}


 