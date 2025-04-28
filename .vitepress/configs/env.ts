import { loadEnv } from 'vitepress';

const envProcess = loadEnv('', process.cwd());

export default {
  env: envProcess.VITE_ENV,
  robotsNoIndex: envProcess.VITE_robotsNoIndex,
  FRONTEND_URL: envProcess.VITE_FRONTEND_URL,
  HUBSPOTFORM: envProcess.VITE_HUBSPOTFORM,
  HUBSPOTPORTAL_ID: envProcess.VITE_HUBSPOTPORTAL_ID,
  HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS: envProcess.VITE_HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS,
  SEGMENT_KEY: envProcess.VITE_SEGMENT_KEY,
  GTM: envProcess.VITE_GTM,
  title: 'US Challenge Coin',
  description: 'Introducing a modern symbol of American pride — crafted to honor heritage, support those who serve, and bring communities together with every purchase.',
  keywords: ['challenge', 'coin'],
  author: 'US Challenge Coin',
  email: 'info@domain.com',
  phone: '123-123-1234',
  locale: 'en_US',
};
