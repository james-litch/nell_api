export const {
  APP_PORT,

  NODE_ENV,

  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,

  JWT_KEY,
  ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_LIFE,
} = process.env;

export const IN_PROD = NODE_ENV === 'production';