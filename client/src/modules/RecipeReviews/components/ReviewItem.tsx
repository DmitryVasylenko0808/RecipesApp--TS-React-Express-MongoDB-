import React from "react";
import { Review } from "../../../api/reviews/dto/get-reviews";
import { BASE_API_URL_AVATARS } from "../../../constants/api";
import { Link } from "react-router-dom";

import nullAvatar from "../../../assets/images/nullavatar.jpg";

type ReviewItemProps = {
  review: Review;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  let date: string | string[] | undefined = review?.createdAt
    .toString()
    .split(/:|T|-/);
  date = date ? `${date[1]}.${date[2]}.${date[0]}` : "";

  const imgSrc = review.author.avatar_file
    ? review.author.avatar_file
    : nullAvatar;

  return (
    <li className="pb-7 border-b-4">
      <div className="mb-3 flex items-center">
        <img
          src={imgSrc}
          alt="Avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex-auto px-4">
          <Link to={"/"} className="font-bold">
            {review.author.login}
          </Link>
          <div className="">rate</div>
        </div>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-500">{review.text}</p>
    </li>
  );
};

export default ReviewItem;
