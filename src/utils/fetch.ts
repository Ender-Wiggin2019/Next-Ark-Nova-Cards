export const fetchCardRatings = async () => {
  const response = await fetch('/api/cards/ratings');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
