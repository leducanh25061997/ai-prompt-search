import PropTypes from 'prop-types';

import {
  Container,
  Text,
} from './index.styled';

type SuggestionItemProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

const SuggestionItem = ({ text, image, onClickItem }: SuggestionItemProps) => {

  return (
    <Container image={image} title={text} onClick={onClickItem}>
      <Text>{text}</Text>
    </Container>
  )
}

SuggestionItem.defaultProps = {
  text: '',
  image: '',
  onClickItem: () => {},
}

export default SuggestionItem;
