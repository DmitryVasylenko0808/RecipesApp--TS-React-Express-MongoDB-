import React from "react";
import { GetReviewsDTO } from "../../../api/reviews/dto/get-reviews";
import ReviewItem from "./ReviewItem";

type ReviewsListProps = {
  data: GetReviewsDTO;
};

const ReviewsList: React.FC<ReviewsListProps> = ({ data = [] }) => {
  return (
    <ul className="space-y-7">
      {data.map((r) => (
        <ReviewItem review={r} key={r._id} />
      ))}
    </ul>
  );
};

export default ReviewsList;
