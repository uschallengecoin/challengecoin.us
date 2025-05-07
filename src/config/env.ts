export const env = {
  env: import.meta.env?.VITE_ENV as string,
  robotsNoIndex: import.meta.env?.VITE_robotsNoIndex as string,
  FRONTEND_URL: import.meta.env?.VITE_FRONTEND_URL as string,
  HUBSPOTFORM: import.meta.env?.VITE_HUBSPOTFORM as string,
  HUBSPOTPORTAL_ID: import.meta.env?.VITE_HUBSPOTPORTAL_ID as string,
  HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS: import.meta.env?.VITE_HUBSPOT_FORM_ID_RECEIVE_LATEST_NEWS as string,
  HUBSPOT_FORM_ID_WAITING_LIST: import.meta.env?.VITE_HUBSPOT_FORM_ID_WAITING_LIST as string,
  SEGMENT_KEY: import.meta.env?.VITE_SEGMENT_KEY as string,
  GTM: import.meta.env?.VITE_GTM as string,
};
