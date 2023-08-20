import React from "react";

// needs type to avoid the TS error?
const ListingPreview: React.FC<{
  listing: object;
  onClick: any;
}> = ({ listing, onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    //Navigate to a new view
    onClick(listing._id);
  };
  return (
    <div className="ProjectPreview link" onClick={handleClick}>
      <h3>{listing.name}</h3>
      <p>{listing.summary}</p>
    </div>
  );
};

export default ListingPreview;
