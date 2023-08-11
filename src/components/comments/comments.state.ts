import { proxy } from 'valtio';

import { type CommentDto } from '@/types/Comment';

export const commentState = proxy<{
  comments: CommentDto[];
}>({
  comments: [],
});

export function setComments(comments: CommentDto[]) {
  commentState.comments = comments;
}

export function signBook(message: CommentDto) {
  // insert message at index 0
  commentState.comments.splice(0, 0, message);
}
