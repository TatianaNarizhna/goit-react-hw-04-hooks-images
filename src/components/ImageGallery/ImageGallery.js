import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import defaultImg from "../../static/default.jpg";

const ImageGallery = ({ images, onImgClick }) => (
  <ul className="ImageGallery" onClick={onImgClick}>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}
      />
    ))}
  </ul>
);

ImageGallery.defaultProps = {
  webformatURL: defaultImg,
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
