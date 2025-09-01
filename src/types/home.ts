export interface WorldMapHeader {
  _id: string
  _createdAt: string
  mainheading: string
  bluehighlight:string
  subtext: string
  isActive: boolean
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface TestimonialSlider {
  _id: string;
  _createdAt: string;
  title: string;
  address: string;
  description: string;
  isActive: boolean;
  image?: SanityImage; 
}


export interface CTAButton {
  _id: string;
  _createdAt: string;
  title: string;
  subtext: string;
  ctabtntext: string;
  ctabtntextanimation: string;
  ctabtnurl: string; 
  isActive: boolean;
}