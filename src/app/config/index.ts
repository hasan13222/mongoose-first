import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.SALT,
  dp: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET_KEY,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRY_TIME,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET_KEY,
  refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRY_TIME,
  smtp_password: process.env.SMTP_PASSWORD,
};
