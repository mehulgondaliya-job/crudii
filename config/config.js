module.exports = {
  TimeZone: process.env.MTZ,
  PORT: process.env.PORT,
  PRODUCTION: process.env.PRODUCTION,
  SEED: process.env.SEED,
  DB: {
    HOST: process.env.DBHOST,
    PORT: process.env.DBPORT,
    NAME: process.env.DBNAME,
    USER: process.env.DBUSER,
    PASS: process.env.DBPASS,
  },
  JWT: {
    EXPIRE: process.env.JWTEXPIRES,
    RSA_ALGO: process.env.RSA_ALGO,
  },
  CRYPTO: {
    SLAT: process.env.SLAT,
  },
  TOKEN: {
    LENGTH: process.env.TOKEN_LENGTH,
    EXIPIRE_IN: process.env.RESETPASSWORD_TOKEN_EXPIRE_IN,
  },
  WEBSITE: {
    ORIGIN: process.env.WEBSITE_ORIGIN,
  },
};
