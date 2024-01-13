import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import { useLazyGetReviewsQuery } from "../../../api/reviews/reviewsApi";
import { useParams } from "react-router";
import { GetReviewsDTO } from "../../../api/reviews/dto/get-reviews";
import ReviewsList from "./ReviewsList";
import { Option } from "../../../types";
import Select from "../../../components/Select";
import InfiniteScroll from "../../../components/InfiniteScroll";

const RecipeReviews = () => {
  const { recipeId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [sortDateOptions, setSortDateOptions] = useState<Option[]>([]);
  const [reviews, setReviews] = useState<GetReviewsDTO>([]);
  const [fetchReview, fetchedReviews] = useLazyGetReviewsQuery();

  useEffect(() => {
    const options = [
      { name: "Newest", value: "-1", selected: true },
      { name: "Oldest", value: "1", selected: false },
    ];
    setSortDateOptions(options);

    fetchReview({ recipeId, page, sortDate: "-1" });
  }, []);

  useEffect(() => {
    if (fetchedReviews.data) {
      if (page === 1) {
        setReviews([...fetchedReviews.data]);
      } else {
        setReviews([...reviews, ...fetchedReviews.data]);
      }
    }
  }, [fetchedReviews.data]);

  const handleScroll = () => {
    setPage(page + 1);

    const { value } =
      (sortDateOptions.find((o) => o.selected === true) as Option) ?? "-1";
    fetchReview({ recipeId, page: page + 1, sortDate: value });
  };

  const handleSelectSortDateOption = (val: string) => {
    setPage(1);

    const updatedOptions = sortDateOptions.map((o) => {
      if (o.value === val) return { ...o, selected: true };
      else return { ...o, selected: false };
    });
    setSortDateOptions(updatedOptions);

    fetchReview({ recipeId, page: 1, sortDate: val });
  };

  return (
    <div>
      <Container>
        <div className="mb-7 pb-4 border-b-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Reviews (total count)</h3>
          <Select
            options={sortDateOptions}
            onSelect={handleSelectSortDateOption}
          />
        </div>
        {reviews.length ? (
          <InfiniteScroll
            isFetching={fetchedReviews.isFetching}
            onScroll={handleScroll}
          >
            <ReviewsList data={reviews} />
          </InfiniteScroll>
        ) : (
          <div className="py-7 text-xl text-center text-gray-500">
            No reviews
          </div>
        )}
      </Container>
    </div>
  );
};

export default RecipeReviews;
