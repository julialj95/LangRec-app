const config = {
  // API_ENDPOINT: "http://localhost:3000/api",
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api",
  API_KEY: process.env.REACT_APP_API_KEY,
};

export default config;
