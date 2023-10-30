
import PropTypes from 'prop-types';

import {
  Container,
  SkeletonItem
} from './index.styled';

type SkeletonLoadingProps = PropTypes.InferProps<typeof propTypes>;


const propTypes = {
  count: PropTypes.number.isRequired,
};
let i = 0;
const SkeletonLoading = ({ count }: SkeletonLoadingProps) => {
    return (
        <Container>
            {Array.from(Array(count), (_, index) => (<SkeletonItem key={i+=1} />))}
        </Container>
    )
};

SkeletonLoading.defaultProps = {
  count: 4,
};

export default SkeletonLoading;
