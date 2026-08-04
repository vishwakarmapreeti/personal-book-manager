import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = verifyToken(token) as {
      userId: string;
    };

    return payload.userId;
  } catch {
    return null;
  }
}