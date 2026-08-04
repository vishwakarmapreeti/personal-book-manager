import mongoose from 'mongoose';

import { successResponse } from '@/lib/api-response';

export async function GET() {
  const isConnected = mongoose.connection.readyState === 1;

  return successResponse(
    'Health check successful',
    {
      status: 'OK',

      database: isConnected
        ? 'Connected'
        : 'Disconnected',

      environment: process.env.NODE_ENV,

      timestamp: new Date().toISOString(),

      uptime: Math.floor(process.uptime()),
    }
  );
}