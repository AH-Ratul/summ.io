import { Server } from "http";
import app from "./app";
import { envConfig } from "./app/config";
import { prisma } from "./app/config/db";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected");
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
};

async function main() {
  try {
    await connectToDB();

    server = app.listen(envConfig.PORT, () => {
      console.log(`Server is listening on Port: ${envConfig.PORT}`);
    });
  } catch (error) {
    console.log("Server error ->", error);
    process.exit(1);
  }
}

(async () => {
  await main();
  await seedSuperAdmin();
})();

// handlig unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("Unhandeld Rejection detected.. shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Uncought Exception detected.. Shutting down..", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
