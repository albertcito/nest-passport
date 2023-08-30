import { ConfigModule } from '@nestjs/config';
export const loadENV = ConfigModule.forRoot();
export const appURL = process.env.APP_URL;
export const corsOrigin = process.env.CORS_ORIGIN;

export const frontend = {
  URL: {
    activeEmail: `${process.env.FRONTEND_URL}/active-email?token=%s`,
    resetPass: `${process.env.FRONTEND_URL}/reset-pass?token=%s`,
  },
};

export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  port: process.env.DB_PORT as unknown as number,
};

export const tokens = {
  jwt: process.env.JWT_TOKEN,
};
