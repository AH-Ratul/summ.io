import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: "development" | "production";
  SALT: string;
}

const loadEnvironments = (): EnvConfig => {
  const requiredVariables: string[] = ["PORT", "NODE_ENV", "SALT"];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      console.log(`Missing required env variables ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    SALT: process.env.SALT as string,
  };
};

export const envConfig = loadEnvironments();
