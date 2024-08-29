import React from "react";
import { Button } from "./ui/button";

interface ButtonLoadMoreProps {
  onLoadMore: (e: React.SyntheticEvent) => void;
  ammountOfClick: number;
}

const ButtonLoadMore: React.FC<ButtonLoadMoreProps> = ({
  ammountOfClick,
  onLoadMore,
}) => {
  return (
    <Button
      className={ammountOfClick === 0 ? "hidden" : "block mt-20"}
      onClick={onLoadMore}
      type="button"
    >
      Load More
    </Button>
  );
};

export default ButtonLoadMore;
