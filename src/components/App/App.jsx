import { Component } from 'react';
import { fetchApi } from '../../services/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    selectedImg: '',
    searchQuery: '',
    page: 1,
    error: null,
    showModal: false,
    staus: 'idle',
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ status: 'pending' });

        fetchApi(searchQuery).then(response => {
          if (response.hits.length === 0) {
            this.setState({
              status: 'rejected',
              images: [],
            });
            return toast.error('No such value, please enter something valid', {
              autoClose: 2000,
            });
          }

          this.setState({
            images: response.hits,
            page: 1,
            status: 'resolved',
          });
        });
      } catch (error) {
        this.setState({ error, status: 'error' });
      }
    }

    if (prevState.page !== page && page !== 1) {
      try {
        this.setState({ status: 'pending' });

        fetchApi(searchQuery, page).then(response => {
          this.setState(({ images }) => {
            return {
              images: [...images, ...response.hits],
              status: 'resolved',
            };
          });
        });
      } catch (error) {
        this.setState({ error, status: 'error' });
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
    const { images, showModal, selectedImg, error, status, showBtn } =
      this.state;

    return (
      <>
        <ToastContainer />
        <Searchbar onSearch={this.handleSearch} />

        <ImageGallery
          images={images}
          onClick={this.toggleModal}
          imgId={this.imgId}
        />
        {status === 'pending' && <Loader />}
        {status === 'error' && <Error error={error.message} />}

        {images.length > 0 && <Button loadMore={this.loadMoreImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
