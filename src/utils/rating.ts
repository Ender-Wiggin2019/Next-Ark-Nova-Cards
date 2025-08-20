import { CommentDto } from '@/types/Comment';

export function getAvgRatings(comments: CommentDto[]): {
  averageRating: number;
  numberOfRatings: number;
} {
  if (!comments || comments.length === 0) {
    return { averageRating: 0, numberOfRatings: 0 };
  }
  // only count non-zero ratings
  const nonZeroRatingComments = comments.filter(
    (comment) => comment.rating !== 0
  );

  if (nonZeroRatingComments.length === 0) {
    return { averageRating: 0, numberOfRatings: 0 };
  }
  const totalRating = nonZeroRatingComments.reduce(
    (accumulator: number, comment: CommentDto) => accumulator + comment.rating,
    0
  );
  const averageRating = totalRating / nonZeroRatingComments.length;
  return { averageRating, numberOfRatings: nonZeroRatingComments.length };
}
