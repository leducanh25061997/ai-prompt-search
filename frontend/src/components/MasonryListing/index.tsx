import { Masonry, usePositioner, useResizeObserver } from "masonic";
import PropTypes from 'prop-types';

import MasonryItem from '@components/MasonryItem';
import {
  Container,

} from './index.styled';

type MasonryListingProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columnGutter: PropTypes.number.isRequired,
  columnWidth: PropTypes.number.isRequired,
  oversCanBy: PropTypes.number.isRequired,
  columnCount: PropTypes.number,
};

const MasonryListing = ({
  items,
  columnGutter,
  columnWidth,
  oversCanBy,
  columnCount,
}: MasonryListingProps) => {
  const positioner = usePositioner({ width: 200, columnGutter: 3 });
  const resizeObserver = useResizeObserver(positioner);

  return (
    <Container>
      <Masonry
        items={items}
        columnGutter={columnGutter}
        columnWidth={columnWidth}
        overscanBy={oversCanBy}
        columnCount={columnCount || 0}
        render={MasonryItem as any}
        maxColumnCount={4}
        resizeObserver={resizeObserver}
      />
    </Container>
  );
};

MasonryListing.propTypes = propTypes;

MasonryListing.defaultProps = {
  items: [],
  columnGutter: 12,
  columnWidth: 198,
  oversCanBy: 4,
  columnCount: 0,
}

export default MasonryListing;
