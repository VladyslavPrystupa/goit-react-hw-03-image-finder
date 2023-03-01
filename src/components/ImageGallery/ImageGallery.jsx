import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick, imgId }) => {
  return (
    <ul>
      <ImageGalleryItem images={images} onClick={onClick} imgId={imgId} />
    </ul>
  );
};
