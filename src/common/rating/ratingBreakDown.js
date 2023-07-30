export const calculateRatingBreakdown = (ratings) => {
  const breakdown = [0, 0, 0, 0, 0]; // Initialize breakdown array for each rating count

  if (ratings && ratings.length > 0) {
    ratings.forEach((rating) => {
      if (rating.star >= 1 && rating.star <= 5) {
        breakdown[rating.star - 1]++; // Increment the count for the respective rating
      }
    });
  }

  return breakdown;
};