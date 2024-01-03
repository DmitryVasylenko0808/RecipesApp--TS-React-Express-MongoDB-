import React from "react";
import { useRate } from "../hooks/useRate";
import { RatingData } from "../types";

import RateIcon from "../assets/icons/rate.svg";
import RateFilledIcon from "../assets/icons/rate_filled.svg";

type RatingProps = {
  rating: RatingData;
  rateNumber?: boolean;
};

const Rating: React.FC<RatingProps> = ({ rating, rateNumber }) => {
  const { countRate, rate } = useRate(rating);

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex gap-x-1">
        {Object.keys(rating).map((k) =>
          rate >= parseFloat(k) ? (
            <RateFilledIcon width={25} height={25} key={k} />
          ) : (
            <RateIcon width={25} height={25} key={k} />
          )
        )}
      </div>
      <div className="flex items-center gap-x-5">
        {rateNumber && <span>{rate}</span>}
        {rating && <span>{countRate} ratings</span>}
      </div>
    </div>
  );
};

export default Rating;
