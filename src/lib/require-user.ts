import { getCurrentUserId } from "./auth";

export async function requireUser() {
  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error("UNAUTHORIZED");
  }

  return userId;
}