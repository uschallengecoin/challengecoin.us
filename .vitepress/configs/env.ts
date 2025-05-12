import { loadEnv } from 'vitepress';

const envProcess = loadEnv('', process.cwd());

export default {
  env: envProcess.VITE_ENV,
  robotsNoIndex: envProcess.VITE_robotsNoIndex,
  FRONTEND_URL: envProcess.VITE_FRONTEND_URL,
  HUBSPOTFORM: envProcess.VITE_HUBSPOTFORM,
  HUBSPOTPORTAL_ID: envProcess.VITE_HUBSPOTPORTAL_ID,
  HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS: envProcess.VITE_HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS,
  HUBSPOT_FORM_ID_WAITING_LIST: envProcess.VITE_HUBSPOT_FORM_ID_WAITING_LIST,
  SEGMENT_KEY: envProcess.VITE_SEGMENT_KEY,
  GTM: envProcess.VITE_GTM,
};
