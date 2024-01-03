import React, { useEffect, useState } from "react";
import Modal from "../../../components/Modal";

import RateIcon from "../../../assets/icons/rate.svg";
import RateFilledIcon from "../../../assets/icons/rate_filled.svg";
import Button from "../../../components/Button";
import { useRateRecipeMutation } from "../../../api/recipes/recipesApi";
import { useParams } from "react-router";

type RateState = {
  value: number;
  active: boolean;
};

type RateRecipeModalProps = {
  onClose: () => void;
};

const RateRecipeModal: React.FC<RateRecipeModalProps> = ({ onClose }) => {
  const { recipeId } = useParams();

  const [rate, setRate] = useState<RateState[]>([]);
  const [isClickedRate, setIsClickedRate] = useState<boolean>(false);

  const [rateRecipeTrigger, { isLoading }] = useRateRecipeMutation();

  useEffect(() => {
    const initialRate: RateState[] = [
      { value: 1, active: false },
      { value: 2, active: false },
      { value: 3, active: false },
      { value: 4, active: false },
      { value: 5, active: false },
    ];

    setRate(initialRate);
  }, []);

  const updateRate = (value: number) => {
    const updatedRate = rate.map((r) =>
      r.value <= value ? { ...r, active: true } : { ...r, active: false }
    );
    setRate(updatedRate);
  };

  const handleClickIcon = (value: number) => {
    setIsClickedRate(true);
    updateRate(value);
  };

  const handleMouseOverIcon = (value: number) => {
    if (!isClickedRate) {
      updateRate(value);
    }
  };

  const handleRate = () => {
    if (isClickedRate && rate.find((r) => r.active)) {
      const rateActiveValues = rate.filter((r) => r.active);
      const rateValue = rateActiveValues[rateActiveValues.length - 1];

      console.log(rateValue);
      rateRecipeTrigger({ id: recipeId, value: rateValue.value })
        .unwrap()
        .then(() => onClose())
        .catch((err) => alert(err.data.message));
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="mb-10 flex gap-x-7">
        {rate.map((r) =>
          r.active ? (
            <RateFilledIcon
              onClick={() => handleClickIcon(r.value)}
              onMouseOver={() => handleMouseOverIcon(r.value)}
              height={70}
              width={70}
              className="cursor-pointer"
              key={r.value}
            />
          ) : (
            <RateIcon
              onClick={() => handleClickIcon(r.value)}
              onMouseOver={() => handleMouseOverIcon(r.value)}
              height={70}
              width={70}
              className="cursor-pointer"
              key={r.value}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        <Button
          variant="secondary"
          onClick={handleRate}
          disabled={!isClickedRate || isLoading}
        >
          Rate
        </Button>
      </div>
    </Modal>
  );
};

export default RateRecipeModal;
