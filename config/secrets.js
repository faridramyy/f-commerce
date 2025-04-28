import "dotenv/config";

const secrets = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  HOST: process.env.HOST,
  PORT: process.env.PORT,
};

export default secrets;
