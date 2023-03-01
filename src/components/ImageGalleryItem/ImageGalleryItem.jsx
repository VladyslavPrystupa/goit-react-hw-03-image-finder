export const ImageGalleryItem = ({ images, onClick, imgId }) => {
  return images.map(image => {
    return (
      <li key={image.id} onClick={() => imgId(image.largeImageURL)}>
        <img src={image.webformatURL} alt={image.tags} onClick={onClick} />
      </li>
    );
  });
};
