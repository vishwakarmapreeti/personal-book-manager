import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

import { apiHandler } from '@/lib/api-handler';
import { signupSchema } from '@/lib/validation';
import { generateToken } from '@/lib/jwt';
import {
  successResponse,
  errorResponse,
} from '@/lib/api-response';

import User from '@/models/User';

export async function POST(request: NextRequest) {
  return apiHandler(async () => {
    const body = await request.json();

    // Validate Request
    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0].message,
        400
      );
    }

    const { fullName, email, password } = validation.data;

    // Check Existing User
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return errorResponse(
        'Email already exists',
        409
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user._id.toString());

    // Store Cookie
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return successResponse(
      'Account created successfully',
      {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      },
      201
    );
  });
}