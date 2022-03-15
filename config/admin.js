module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6359e77d46061c55b490073f843feff9'),
  },
  url: env('PUBLIC_ADMIN_URL', '/admin'),
});
