import dotenv from 'dotenv';
import helmet from 'helmet';
dotenv.config();

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
      'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      'script-src': ["'self'", "'unsafe-inline'"]
    }
  }
}));

export const config = {
  mongoURI: process.env.MONGO_URI,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  port: process.env.PORT || 5000,
};
