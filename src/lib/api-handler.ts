import connectDB from "./db";

import { errorResponse } from "./api-response";

export async function apiHandler(
  callback: () => Promise<Response>
) {
  try {

    await connectDB();

    return await callback();

  } catch (error) {

    console.error(error);

    if (
      error instanceof Error &&
      error.message === "UNAUTHORIZED"
    ) {
      return errorResponse(
        "Unauthorized",
        401
      );
    }

    return errorResponse(
      "Internal Server Error",
      500
    );
  }
}