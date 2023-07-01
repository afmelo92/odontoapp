export default {
  app: {
    web: {
      url: process.env.APP_FRONTEND_URL || 'http://localhost:3000',
    },
  },
  hash: {
    salt: 8,
  },
};
