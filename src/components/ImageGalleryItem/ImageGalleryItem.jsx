import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onClick, imgId }) => {
  return images.map(image => {
    return (
      <GalleryItem key={image.id} onClick={() => imgId(image.largeImageURL)}>
        <GalleryItemImage
          src={image.webformatURL}
          alt={image.tags}
          onClick={onClick}
        />
      </GalleryItem>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webImgURL: PropTypes.string,
      lgImgURL: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  imgId: PropTypes.func.isRequired,
};
