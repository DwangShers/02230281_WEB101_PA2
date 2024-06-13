import React, { useState } from "react";
import emptyStar from "../../image/non-favourite.png"; // Adjust the path based on your structure
import fullStar from "../../image/favourite.png"; // Adjust the path based on your structure

const Favourite = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const starImage = isFavourite ? fullStar : emptyStar;

  return (
    <button
      className="btn btn-outline-secondary btn-sm position-absolute bottom-0 end-0 m-2"
      onClick={toggleFavourite}
    >
      <img
        src={starImage}
        alt={isFavourite ? "Full Star" : "Empty Star"}
        style={{ width: "2em", height: "2em" }}
      />
    </button>
  );
};

export default Favourite;
