import { apiHandler } from '@/lib/api-handler';
import { getCurrentUserId } from '@/lib/auth';
import {
  successResponse,
  errorResponse,
} from '@/lib/api-response';

import User from '@/models/User';

export async function GET() {
  return apiHandler(async () => {
    // Get Logged-in User ID
    const userId = await getCurrentUserId();

    if (!userId) {
      return errorResponse(
        'Unauthorized',
        401
      );
    }

    // Find User
    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(
        'User not found',
        404
      );
    }

    return successResponse(
      'User fetched successfully',
      {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      },
      200
    );
  });
}