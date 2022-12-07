require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  secretKey: process.env.SECRET_KEY,
  recoveryKey: process.env.RECOVERY_KEY,
  googleMail: process.env.GOOGLE_MAIL,
  googlePassword: process.env.GOOGLE_PASSWORD
}

module.exports = { config };
