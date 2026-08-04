import { cookies } from 'next/headers';

import { successResponse } from '@/lib/api-response';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('token');

  return successResponse(
    'Logged out successfully',
    {},
    200
  );
}