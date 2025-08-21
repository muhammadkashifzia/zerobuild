export interface AboutPageBanner {
  _id: string;
  title: string;
  description: string;
  introText?: string;
  introImage?: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
  newBuildButtonText?: string;
  retrofitButtonText?: string;
  exploreNewBuildButtonText?: string;
  exploreRetrofitButtonText?: string;
  swiperImages?: Array<{
    image: { asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } } };
    altText: string;
  }>;
  mainHeading?: string;
  newBuildIntroText?: string;
  newBuildSubText?: string;
  newBuildDescription?: string;
  newBuildThermalText?: string;
  newBuildSummaryText?: string;
  newBuildResultText?: string;
  retrofitIntroText?: string;
  retrofitDescription?: string;
  retrofitResultText?: string;
  defaultHeading?: string;
  defaultDescription?: string;
}
