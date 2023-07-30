export const calculateAverageRating = (ratings) => {
  if (ratings && ratings.length > 0) {
    const totalStars = ratings.reduce((sum, rating) => sum + rating.star, 0);
    const maximumRating = ratings.length * 5;
      return (totalStars * 5) / maximumRating;
  }
  return 0;
};