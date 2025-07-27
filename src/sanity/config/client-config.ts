// config/client-config.ts
import { projectId, dataset, apiVersion, sanityToken } from "@/sanity/env";

export default {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: sanityToken,
};
