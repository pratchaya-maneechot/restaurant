import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { IRestaurantReview } from '@src/types/restaurant';

import { useState } from 'react';
import RestaurantReviewItem from './restaurant-review-item';

// ----------------------------------------------------------------------

type Props = {
  reviews: IRestaurantReview[];
  rowPerPage?: number;
};

export default function RestaurantReviewList({ reviews, rowPerPage = 5 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / rowPerPage);
  const startIndex = (currentPage - 1) * rowPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + rowPerPage);
  return (
    <>
      {currentReviews.map((review) => (
        <RestaurantReviewItem key={review.id} review={review} />
      ))}

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{
            mx: 'auto',
            [`& .${paginationClasses.ul}`]: {
              my: 5,
              mx: 'auto',
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
