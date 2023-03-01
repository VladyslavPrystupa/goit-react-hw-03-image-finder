import axios from 'axios';
import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
// import { fetchApi } from '../../services/api';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32943531-cb871ea456f4d19bb7942720c';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ isLoading: true });

      const response = await axios.get(BASE_URL, {
        params: {
          key: KEY,
          q: `${searchQuery}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: 1,
        },
      });
      this.setState({ images: response.data.hits, page: 1, isLoading: false });
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });

      const response = await axios.get(BASE_URL, {
        params: {
          key: KEY,
          q: `${searchQuery}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 12,
          page: `${page}`,
        },
      });

      this.setState(({ images }) => {
        return {
          images: [...images, ...response.data.hits],
          isLoading: false,
        };
      });
    }
  }

  handleSearch = value => {
    this.setState({ searchQuery: value });
  };

  loadMoreImages = () => {
    this.setState(({ page }) => {
      return {
        page: (page += 1),
      };
    });
  };

  render() {
    const { images, isLoading } = this.state;

    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} />
        {images.length > 0 && <Button loadMore={this.loadMoreImages} />}
        {isLoading && <Loader />}
      </Container>
    );
  }
}
