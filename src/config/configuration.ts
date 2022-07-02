export default (): any => ({
  nodeEnv: process.env.NODE_ENV,
  internalSecret: process.env.INTERNAL_API_SECRET,
  port: parseInt(process.env.PORT),
  database: process.env.DATABASE_URL,
  logEnabled: process.env.LOG === 'true',
  salt: parseInt(process.env.SALT),
  loggly: {
    enabled: process.env.LOG === 'true',
    logLevel: ['warn', 'error', 'info'],
    token: process.env.LOGGLY_TOKEN,
    subdomain: process.env.LOGGLY_SUBDOMAIN,
    tags: [process.env.LOGGLY_TAGS],
    json: true,
  },
});
