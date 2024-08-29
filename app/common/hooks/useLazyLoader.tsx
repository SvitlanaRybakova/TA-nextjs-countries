import React, { useState } from "react";

const LazyLoader = (length: number) => {
  const [limit, setLimit] = useState(8);

  const ammountOfClick = Math.floor(length / limit);

  const onLoadMore = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (ammountOfClick > 0) {
      setLimit((prev) => prev + 4);
    }
  };

  return { limit, ammountOfClick, onLoadMore };
};

export default LazyLoader;
