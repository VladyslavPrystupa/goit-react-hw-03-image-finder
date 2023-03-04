import { Component } from 'react';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';

import {
  Form,
  SearchFormButton,
  SearchFormInput,
  Header,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searcValue: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { searcValue } = this.state;

    if (searcValue.trim() === '') {
      return toast.error('enter value!', { autoClose: 3000 });
    }

    this.props.onSearch(searcValue);

    this.reset();
  };

  reset() {
    this.setState({
      searcValue: '',
    });
  }

  render() {
    const { searcValue } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size="2em" />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searcValue"
            value={searcValue}
            onChange={this.handleChange}
          />
        </Form>
      </Header>
    );
  }
}
