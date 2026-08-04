import { NextRequest } from 'next/server';

import { apiHandler } from '@/lib/api-handler';
import {
    successResponse,
    errorResponse,
} from '@/lib/api-response';
import { createBookSchema } from '@/lib/book-validation';
import { requireUser } from '@/lib/require-user';

import Book from '@/models/Book';

/* ===========================
   CREATE BOOK
=========================== */

export async function POST(request: NextRequest) {
    return apiHandler(async () => {
        const userId = await requireUser();

        const body = await request.json();

        const validation = createBookSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(
                validation.error.issues[0].message,
                400
            );
        }

        const {
            title,
            author,
            tags,
            status,
        } = validation.data;

        const book = await Book.create({
            title,
            author,
            tags,
            status,
            user: userId,
        });

        return successResponse(
            'Book created successfully',
            {
                book: {
                    id: book._id,
                    title: book.title,
                    author: book.author,
                    tags: book.tags,
                    status: book.status,
                    user: book.user,
                    createdAt: book.createdAt,
                    updatedAt: book.updatedAt,
                },
            },
            201
        );
    });
}

/* ===========================
   GET BOOKS
=========================== */

export async function GET(request: NextRequest) {
  return apiHandler(async () => {
    const userId = await requireUser();

    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const tag = searchParams.get('tag');

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const sort = searchParams.get('sort') || 'newest';

    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {
      user: userId,
    };

    /* --------------------------
       Search
    --------------------------- */

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          author: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    /* --------------------------
       Status Filter
    --------------------------- */

    if (status) {
      query.status = status;
    }

    /* --------------------------
       Tag Filter
    --------------------------- */

    if (tag) {
      query.tags = tag;
    }

    /* --------------------------
       Sorting
    --------------------------- */

    let sortQuery: Record<string, 1 | -1>;

    switch (sort) {
      case 'oldest':
        sortQuery = {
          createdAt: 1,
        };
        break;

      case 'title':
        sortQuery = {
          title: 1,
        };
        break;

      case 'author':
        sortQuery = {
          author: 1,
        };
        break;

      default:
        sortQuery = {
          createdAt: -1,
        };
        break;
    }

    /* --------------------------
       Total Books
    --------------------------- */

    const totalBooks = await Book.countDocuments(query);

    /* --------------------------
       Fetch Books
    --------------------------- */

    const books = await Book.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit);

    /* --------------------------
       Pagination
    --------------------------- */

    const totalPages = Math.ceil(totalBooks / limit);

    return successResponse(
      'Books fetched successfully',
      {
        books,

        pagination: {
          page,
          limit,
          totalBooks,
          totalPages,

          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      }
    );
  });
}