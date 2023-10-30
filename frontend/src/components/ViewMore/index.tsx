import PropTypes from 'prop-types';
import DownCaretIcon from '@components/Icons/DownCaretIcon';

import ViewMoreSpinner from '@assets/ViewMoreSpinner.svg';

import {
  Container,
  Text,
} from './index.styled';

type ViewMoreProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

const ViewMore = ({ loading, onClick }: ViewMoreProps) => {
  const handleClick = (e: any) => {
    if (loading) return;
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <Container onClick={handleClick}>
      {loading ? <img src={ViewMoreSpinner} alt="View More" /> : (<><Text>View more</Text><DownCaretIcon /></>)}
    </Container>
  );
};

ViewMore.defaultProps = {
  onClick: () => {},
  loading: false,
};

export default ViewMore;
