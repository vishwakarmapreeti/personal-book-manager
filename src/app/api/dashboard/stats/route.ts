import mongoose from 'mongoose';

import { apiHandler } from '@/lib/api-handler';
import { successResponse } from '@/lib/api-response';
import { requireUser } from '@/lib/require-user';

import Book from '@/models/Book';

export async function GET() {
  return apiHandler(async () => {
    // Get theh curret user
    const userId = await requireUser();   

    // Convert the user id for the query
    const userObjectId = new mongoose.Types.ObjectId(userId);

  


    // get book count by status
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
// add count to the dashboard data
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