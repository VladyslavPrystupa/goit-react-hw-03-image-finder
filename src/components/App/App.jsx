import { Component } from 'react';
import { fetchApi } from '../../services/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import { Container } from './App.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    selectedImg: '',
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoading: true, images: [] });

        fetchApi(searchQuery).then(response => {
          if (response.length === 0) {
            return toast.error('No such value, please enter something valid', {
              autoClose: 2000,
            });
          }

          this.setState({
            images: response,
            page: 1,
          });
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

        fetchApi(searchQuery, page).then(response => {
          this.setState(({ images }) => {
            return {
              images: [...images, ...response],
            };
          });
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
    const { images, showModal, selectedImg, error, isLoading } = this.state;
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSearch={this.handleSearch} />
        {isLoading && <Loader />}

        <ImageGallery
          images={images}
          onClick={this.toggleModal}
          imgId={this.imgId}
        />

        {/* {error && <h1>Invalid value!</h1>} */}
        {/* {status === 'rejected' && <h1>Invalid value!</h1>} */}

        {images.length > 0 && <Button loadMore={this.loadMoreImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </Container>
    );
  }
}
