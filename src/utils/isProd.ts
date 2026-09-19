// USE_MOCK_DATA forces the mockData path even under `next build`, which always
// sets NODE_ENV=production.
const isProduction =
  process.env.NODE_ENV === "production" && !process.env.USE_MOCK_DATA;
// const isProduction = false;
export default isProduction;
