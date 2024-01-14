import React from "react";
import Paper from "../../../components/Paper";

import RateIcon from "../../../assets/icons/rate.svg";
import Button from "../../../components/Button";
import Rating from "../../../components/Rating";
import { RatingData } from "../../../types";
import { useRate } from "../../../hooks/useRate";
import RateAnalyticItem from "./RateAnalyticItem";

type RateAnalyticsProps = {
  rating: RatingData;
  isRated: boolean;
  onRate: () => void;
};

const RateAnalytics: React.FC<RateAnalyticsProps> = ({
  rating,
  isRated,
  onRate,
}) => {
  const { countRate, analytics } = useRate(rating);

  return (
    <div className="py-5 flex justify-center">
      <Paper>
        <RateIcon className="mb-5 mx-auto" width={85} height={85} />
        <p className="mb-3 text-center text-lg text-gray-500">
          What do you think about this recipe?
          <br />
          Rate it!
        </p>
        <div className="mb-8 flex justify-center">
          {!isRated && (
            <Button variant="secondary" onClick={onRate}>
              Add rating
            </Button>
          )}
        </div>
        <hr className="mb-5 border-b-0.5 border-gray-400/50" />
        <div className="flex justify-center">
          <Rating rating={rating} rateNumber />
        </div>
        <div className="py-5 space-y-4">
          {analytics.map((a, i) => (
            <RateAnalyticItem analytics={a} key={i} />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default RateAnalytics;
