export const fetchCardRatings = async () => {
  const response = await fetch('/api/cards/ratings');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchUserCardRatings = async (userId: string) => {
  const response = await fetch('/api/cards/myRatings?userId=' + userId);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchAllQuizs = async () => {
  const response = await fetch('/api/quiz/lists');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
