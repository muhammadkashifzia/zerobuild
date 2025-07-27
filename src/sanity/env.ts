// config/env.ts

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-24';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7xgcerpq',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

export const sanityToken = assertValue(
  process.env.SANITY_WRITE_TOKEN,
  'Missing environment variable: SANITY_WRITE_TOKEN'
);

// reCAPTCHA keys
export const recaptchaSiteKey = assertValue(
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6Lfda5ArAAAAAGK9dIU4PnEjjtkStRPXX0f-dtwz',
  'Missing environment variable: NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
);

export const recaptchaSecretKey = assertValue(
  process.env.RECAPTCHA_SECRET_KEY || '6Lfda5ArAAAAABJN5YwnoBRUlRLWtqXh3XTxgwqZ',
  'Missing environment variable: RECAPTCHA_SECRET_KEY'
);

export const m365apppassword = assertValue(
  process.env.M365_APP_PASSWORD || '49jKa1=Ae4*@',
  'Missing environment variable: M365_APP_PASSWORD'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage);
  }

  return v;
}
