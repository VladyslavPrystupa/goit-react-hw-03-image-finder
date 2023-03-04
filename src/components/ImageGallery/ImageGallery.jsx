import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, onClick, imgId }) => {
  return (
    <ImageGalleryList>
      <ImageGalleryItem images={images} onClick={onClick} imgId={imgId} />
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
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
