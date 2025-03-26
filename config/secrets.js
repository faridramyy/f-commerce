import "dotenv/config";

const secrets = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

export default secrets;
