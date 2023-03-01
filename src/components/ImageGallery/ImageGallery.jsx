import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul>
      <ImageGalleryItem images={images} />
    </ul>
  );
};
