import { Component } from 'react';
export class ImageGalleryItem extends Component {
  render() {
    return this.props.images.map(image => {
      return (
        <li
          key={image.id}
          onClick={() => this.props.imgId(image.largeImageURL)}
        >
          <img
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.props.onClick}
          />
        </li>
      );
    });
  }
}
