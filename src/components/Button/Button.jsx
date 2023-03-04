import { LoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <LoadMore onClick={loadMore} type="button">
      Load more
    </LoadMore>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
