import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  SALT: string;
  JWT: {
    ACCESS_SECRET: string;
    ACCESS_EXPIRES: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRES: string;
  };
}

const loadEnvironments = (): EnvConfig => {
  const requiredVariables: string[] = [
    "PORT",
    "NODE_ENV",
    "SALT",
    "ACCESS_SECRET",
    "ACCESS_EXPIRES",
    "REFRESH_SECRET",
    "REFRESH_EXPIRES",
  ];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      console.log(`Missing required env variables ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    SALT: process.env.SALT as string,
    JWT: {
      ACCESS_SECRET: process.env.ACCESS_SECRET as string,
      ACCESS_EXPIRES: process.env.ACCESS_EXPIRES as string,
      REFRESH_SECRET: process.env.REFRESH_SECRET as string,
      REFRESH_EXPIRES: process.env.REFRESH_EXPIRES as string,
    },
  };
};

export const envConfig = loadEnvironments();
