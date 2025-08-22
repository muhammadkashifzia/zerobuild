export interface AboutPageBanner {
  _id: string;
  title: string;
  description: string;
  introContent?: any;
  mainHeading?: string;
  newBuildButtonText?: string;
  retrofitButtonText?: string;
  exploreNewBuildButtonText?: string;
  exploreRetrofitButtonText?: string;
  swiperImages?: Array<{
    image: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
    altText: string;
  }>;
  newBuildIntroText?: any;
  newBuildSummaryText?: string;
  newBuildResultText?: string;
  newBuildResultCta?: { text?: string; link?: string };
  retrofitIntroText?: string;
  retrofitDescription?: string;
  retrofitResultText?: string;
  defaultHeading?: string;
  defaultDescription?: string;
}
