import React from "react";

const Photo = ({ urls: { regular }, alt_description }) => {
  return (
    <div className="imageContainer">
      <img src={regular} alt="asd" className="img" />
      <p>{alt_description}</p>
    </div>
  );
};

export default Photo;
