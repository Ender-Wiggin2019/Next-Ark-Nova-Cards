import { CommentDto } from '@/types/Comment';

export function getAvgRatings(comments: CommentDto[]): {
  averageRating: number;
  numberOfRatings: number;
} {
  if (!comments || comments.length === 0) {
    return { averageRating: 0, numberOfRatings: 0 };
  }

  let totalRating = 0;
  for (const comment of comments) {
    totalRating += comment.rating;
  }

  const averageRating = totalRating / comments.length;
  return { averageRating, numberOfRatings: comments.length };
}
