// config/client-config.ts
import { projectId, dataset, apiVersion, sanityToken } from "@/sanity/env";
import type { ClientConfig } from 'next-sanity';

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Changed from true to false - this is the key fix!
  token: sanityToken,
  ignoreBrowserTokenWarning: true, // Suppress token warnings
  perspective: 'published' as const, // Properly typed perspective
  stega: {
    enabled: false, // Disable visual editing for better performance
  },
};

export default config;