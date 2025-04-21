const env = process.env.NODE_ENV;

export const base = {
  API_URL: 
  env == "production" ? process.env.api_url_prod : process.env.api_url_local,
  HEADER_AUTHORIZATION: "App-AUTH",
  X_API_KEY: "X API Key",
  APP_NAME: "Supido",
  WEBSITE_URL: "http://localhost:3000",
  // 'http://192.168.1.45:8009',
};
