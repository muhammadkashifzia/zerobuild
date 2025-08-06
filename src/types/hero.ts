export interface HeroButton {
  text: string;
  link: string;
}

export interface Hero {
  _id: string;
  title: string;
  titleHighlight: string[];
  description: string;
  primaryButton: HeroButton;
  secondaryButton: HeroButton;
  isActive: boolean;
} 