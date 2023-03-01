import { Component } from 'react';

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
    const value = this.state.searcValue;
    this.props.onSearch(value);
  };

  render() {
    const { searcValue } = this.state;
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searcValue"
            value={searcValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
