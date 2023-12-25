import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumb } from "../types";

import ChevronIcon from "../../../assets/icons/chevron_down.svg";

type BreadCrumbsProps = {
  breadCrumbs: BreadCrumb[];
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ breadCrumbs }) => {
  return (
    <div className="mb-3 flex gap-x-2">
      {breadCrumbs.map((bc, index) => {
        return (
          <div className="flex items-center gap-x-2">
            {index !== 0 && (
              <ChevronIcon
                width={20}
                height={20}
                className="-rotate-90 text-gray-500"
              />
            )}
            <Link to={bc.path} className="text-gray-500 font-bold">
              {bc.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
