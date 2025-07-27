// config/env.ts

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-24';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const sanityToken = assertValue(
  process.env.SANITY_WRITE_TOKEN,
  'Missing environment variable: SANITY_WRITE_TOKEN'
);

// reCAPTCHA keys
export const recaptchaSiteKey = assertValue(
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  'Missing environment variable: NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
);

export const recaptchaSecretKey = assertValue(
  process.env.RECAPTCHA_SECRET_KEY,
  'Missing environment variable: RECAPTCHA_SECRET_KEY'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage);
  }

  return v;
}
