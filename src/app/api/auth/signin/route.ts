import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

import { apiHandler } from '@/lib/api-handler';
import { signinSchema } from '@/lib/validation';
import { generateToken } from '@/lib/jwt';
import {
  successResponse,
  errorResponse,
} from '@/lib/api-response';

import User from '@/models/User';

export async function POST(request: NextRequest) {
  return apiHandler(async () => {
    const body = await request.json();

    // check the request data
    const validation = signinSchema.safeParse(body);

    if (!validation.success) {
      return errorResponse(
        validation.error.issues[0].message,
        400
      );
    }

    const { email, password } = validation.data;

    // get the user from the db
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select('+password');

    if (!user) {
      return errorResponse(
        'Invalid email or password',
        401
      );
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return errorResponse(
        'Invalid email or password',
        401
      );
    }

    // create token for the login user
    const token = generateToken(user._id.toString());

    // save token in cookie
    const cookieStore = await cookies();

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, //7 day
      path: '/',
    });

    return successResponse(
      'Login successful',
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