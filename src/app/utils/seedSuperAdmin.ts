import { Role } from "../../../generated/prisma";
import { envConfig } from "../config";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdmin = await prisma.user.findUnique({
      where: { email: envConfig.SUPER_ADMIN_EMAIL },
    });

    if (isSuperAdmin) {
      console.log("Super Admin already exists!!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      envConfig.SUPER_ADMIN_PASSWORD,
      Number(envConfig.SALT)
    );

    const payload = {
      name: "ADMIN",
      role: Role.SUPER_ADMIN,
      email: envConfig.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
    };

    const superAdmin = await prisma.user.create({ data: payload });

    if (superAdmin) {
      console.log("Super Admin Created");
    }
  } catch (error) {
    console.log("super error", error);
  }
};
