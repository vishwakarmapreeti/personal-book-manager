import mongoose from 'mongoose';

import { apiHandler } from '@/lib/api-handler';
import { successResponse } from '@/lib/api-response';
import { requireUser } from '@/lib/require-user';

import Book from '@/models/Book';

export async function GET() {
  return apiHandler(async () => {
    // Get logged-in user id
    const userId = await requireUser();   

    // Convert string to ObjectId for aggregation
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Debug: Verify books exist
    const books = await Book.find({
      user: userId,
    });


    // Aggregate statistics
    const stats = await Book.aggregate([
      {
        $match: {
          user: userObjectId,
        },
      },
      {
        $group: {
          _id: '$status',
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const dashboard = {
      totalBooks: 0,
      wantToRead: 0,
      reading: 0,
      completed: 0,
    };

    stats.forEach((item) => {
      dashboard.totalBooks += item.count;

      switch (item._id) {
        case 'Want to Read':
          dashboard.wantToRead = item.count;
          break;

        case 'Reading':
          dashboard.reading = item.count;
          break;

        case 'Completed':
          dashboard.completed = item.count;
          break;
      }
    });

    return successResponse(
      'Dashboard statistics fetched successfully',
      {
        statistics: dashboard,
      }
    );
  });
}