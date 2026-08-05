import { NextRequest } from 'next/server';
import mongoose from 'mongoose';

import { apiHandler } from '@/lib/api-handler';
import {
    successResponse,
    errorResponse,
} from '@/lib/api-response';
import { updateBookSchema } from '@/lib/book-validation';
import { requireUser } from '@/lib/require-user';

import Book from '@/models/Book';


//    UPDATE BOOK


export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return apiHandler(async () => {
        const userId = await requireUser();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse('Invalid book id', 400);
        }

        const body = await request.json();

        const validation = updateBookSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse(
                validation.error.issues[0].message,
                400
            );
        }

        const updateData = validation.data;

        const updatedBook = await Book.findOneAndUpdate(
            {
                _id: id,
                user: userId,
            },
            {
                $set: updateData,
            },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        if (!updatedBook) {
            return errorResponse(
                'Book not found',
                404
            );
        }

        return successResponse(
            'Book updated successfully',
            {
                book: updatedBook,
            }
        );
    });
}


//    DELETE BOOK


export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return apiHandler(async () => {
        const userId = await requireUser();

        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return errorResponse('Invalid book id', 400);
        }

        const deletedBook = await Book.findOneAndDelete({
            _id: id,
            user: userId,
        });

        if (!deletedBook) {
            return errorResponse(
                'Book not found',
                404
            );
        }

        return successResponse(
            'Book deleted successfully'
        );
    });
}


// get book by id
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return apiHandler(async () => {
    const userId = await requireUser();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse('Invalid book id', 400);
    }

    const book = await Book.findOne({
      _id: id,
      user: userId,
    });

    if (!book) {
      return errorResponse(
        'Book not found',
        404
      );
    }

    return successResponse(
      'Book fetched successfully',
      {
        book,
      }
    );
  });
}