export const ImageGalleryItem = ({ images }) => {
  return images.map(image => {
    return (
      <li key={image.id}>
        <img src={image.webformatURL} alt={image.tags} />
      </li>
    );
  });
};
