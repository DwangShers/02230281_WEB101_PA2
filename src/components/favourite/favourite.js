import React from "react";
import emptyStar from "../../image/non-favourite.png"; // Adjust the path based on your structure
import fullStar from "../../image/favourite.png"; // Adjust the path based on your structure

const Favourite = ({ isFavourite, toggleFavourite }) => {
  const starImage = isFavourite ? fullStar : emptyStar;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent the click from propagating to the Link
    toggleFavourite();
  };

  return (
    <button
      className="btn btn-outline-secondary btn-sm position-absolute bottom-0 end-0 m-2"
      onClick={handleClick}
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
