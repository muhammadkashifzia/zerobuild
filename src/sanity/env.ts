
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage);
  }
  return v;
}

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
  process.env.SANITY_WRITE_TOKEN || 'skFLjj3rc2pAnHBLrJUzlRIRyx0SJ4ajimJJEdX1EwRAl8e2FmsIPx1ZDH4nb8zsgFy19U6K9Gim7SFeGROWlYIP9sMowtZ8lZlzaMTeDgHk2r6f51xj8FmMN9xATi5Fn7RgRPUDJTJt6ocLbOiDGHNLfDKEOUGGd2wFkovunkpSXSXkNd8x',
  'Missing environment variable: SANITY_WRITE_TOKEN'
);

export const recaptchaSiteKey = assertValue(
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LdFN5ErAAAAACC9jOKKXt5COxWid-RVuejbWJcS',
  'Missing environment variable: NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
);

export const recaptchaSecretKey = assertValue(
  process.env.RECAPTCHA_SECRET_KEY || '6LdFN5ErAAAAAKBWoI-KJb6mJWV8pkXap05hC8Bu',
  'Missing environment variable: RECAPTCHA_SECRET_KEY'
);

export const emailAppPassword = assertValue(
  process.env.EMAIL_APP_PASSWORD || '14Arid1336',
  'Missing environment variable: EMAIL_APP_PASSWORD'
);
