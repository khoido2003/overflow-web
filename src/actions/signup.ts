"use server";

import { db } from "@/lib/db";
import { registerPayload, registerSchema } from "@/lib/schemas/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const register = async (values: registerPayload) => {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, name, password, passwordConfirm } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: "Create account successfully" };

    redirect("/");
  } catch (err) {
    console.log(err);

    return { error: "Something went wrong" };
  }
};
