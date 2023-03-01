import axios from 'axios';
import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Container } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32943531-cb871ea456f4d19bb7942720c';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    selectedImg: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
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
        this.setState({
          images: response.data.hits,
          page: 1,
          isLoading: false,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page !== page && page !== 1) {
      try {
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
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  imgId = id => {
    this.setState({ selectedImg: id });
  };

  render() {
    const { images, isLoading, showModal, selectedImg } = this.state;
    return (
      <Container>
        <Searchbar onSearch={this.handleSearch} />
        {isLoading && <Loader />}
        <ImageGallery
          images={images}
          onClick={this.toggleModal}
          imgId={this.imgId}
        />
        {images.length > 0 && <Button loadMore={this.loadMoreImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImg} alt="#" />
          </Modal>
        )}
      </Container>
    );
  }
}
