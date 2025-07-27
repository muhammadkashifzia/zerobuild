// config/client-config.ts
export default {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || '7xgcerpq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET! || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-07-23',
  useCdn: true,
  token: process.env.SANITY_WRITE_TOKEN || 'skZpfihXNboppSw7uphYYP74XjfokqvW354SipjosgkARnQx32N5WjRzs4d4zLrIjeBkdINJHio9ChPhugtSaEpvyum8oO3hIEYxryge4RutmZoDUGmSIa7wn4ASUhP8WAvrL5inCrAFRmP8g0JoZRSA3vDj9DbxED0kdU1Iujlcv19By95m',
}

