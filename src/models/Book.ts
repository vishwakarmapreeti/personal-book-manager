import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  tags: string[];
  status: 'Want to Read' | 'Reading' | 'Completed';
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ['Want to Read', 'Reading', 'Completed'],
      default: 'Want to Read',
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Indexes
 */

// Fast lookup of all books for a user
BookSchema.index({ user: 1 });

// Fast filtering by user + status
BookSchema.index({ user: 1, status: 1 });

// Fast sorting by newest books
BookSchema.index({ user: 1, createdAt: -1 });

// Full-text search
BookSchema.index({
  title: 'text',
  author: 'text',
});

const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);

export default Book;