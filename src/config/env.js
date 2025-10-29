import 'dotenv/config';

const getEnv = (key, defaultValue = null) => process.env[key] || defaultValue;

export default {
  PORT: getEnv('PORT', 3000),
  MONGODB_URI: getEnv('MONGODB_URI'),
  JWT_SECRET: getEnv('JWT_SECRET'),
};