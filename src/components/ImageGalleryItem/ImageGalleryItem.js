import React from "react";
import PropTypes from "prop-types";

const GalleryItem = ({ id, webformatURL, largeImageURL }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={webformatURL}
        alt="img"
        className="ImageGalleryItem-image"
        data-img={largeImageURL}
      />
    </li>
  );
};

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default GalleryItem;
