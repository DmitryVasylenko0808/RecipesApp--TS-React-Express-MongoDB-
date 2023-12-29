import React from "react";
import { RateAnalytics } from "../../../types";

import RateIcon from "../../../assets/icons/rate.svg";

type RateAnalyticItemProps = {
  analytics: RateAnalytics;
};

const RateAnalyticItem: React.FC<RateAnalyticItemProps> = ({ analytics }) => {
  const blockPercentageClassName = !analytics.percentage
    ? `w-0 h-full bg-peach`
    : `w-[${analytics.percentage}%] h-full bg-peach`;

  return (
    <div className="flex items-center gap-x-3">
      <span className="font-bold">{analytics.name}</span>
      <RateIcon width={20} height={20} />
      <div className="relative flex-auto h-5 bg-gray-300/70">
        <div className={blockPercentageClassName} />
      </div>
      <span className="text-gray-500">{analytics.count}</span>
    </div>
  );
};

export default RateAnalyticItem;
