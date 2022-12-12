import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    DATABASE_NAME: process.env.DATABASE_NAME,
    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY: process.env.ACCESS_REFRESH_KEY,
    ACTION_TOKEN_KEY: process.env.ACCESS_ACTION_KEY,
    SUPER_USER: process.env.SUPER_USER,
    EXPIRES_ACCESS: '1d',
    EXPIRES_REFRESH: '2d',
    GOOGLE_APPLICATION_EMAIL: process.env.GOOGLE_APPLICATION_EMAIL,
    GOOGLE_APPLICATION_PASSWORD: process.env.GOOGLE_APPLICATION_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NODE_ENV: process.env.NODE_ENV || 'dev',
    CONFIRM_CODE: Math.floor(Math.random() * (999999 - 100000) + 100000),

};
