export interface Performance {
  _id: string;
  mainTitle: string;
  isActive: boolean;
  contentAboveGraph?: any;
  contentBelowGraph?: any;
  cta?: { text?: string; link?: string };
} 