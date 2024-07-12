"use server";

import { signIn } from "@/auth";
import { loginPayload, loginSchema } from "@/lib/schemas/auth";
import { AuthError } from "next-auth";

export const login = async (values: loginPayload) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return {
      success: "Login successfully!",
    };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" };

        case "CallbackRouteError":
          return { error: "Invalid email or password!" };

        default:
          return {
            error: "Something went wrong!",
          };
      }
    }

    // Must have this line so it can redirect
    throw err;
  }
};
