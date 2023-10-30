import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MasonryItem from '@components/MasonryItem';
import RightCaretIcon from '@components/Icons/RightCaretIcon';
import LeftCaretIcon from '@components/Icons/LeftCaretIcon';
import {
  Container,
} from './index.styled'

type SuggestionsProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SlickListing = ({ items }: SuggestionsProps) => {
  const settings = {
    lazyLoad: "ondemand" as any,
    dots: false,
    rows: 2,
    slidesPerRow: 8,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    infinite: false,
    prevArrow: <button className='slick-arrow slick-prev'><LeftCaretIcon /></button>,
    nextArrow: <button className='slick-arrow slick-next'><RightCaretIcon /></button>,
    responsive: [
      { breakpoint: 1400,
        settings: {
          slidesPerRow: 7
        }
      },
      { breakpoint: 1368,
        settings: {
          slidesPerRow: 6
        }
      },
      { breakpoint: 1200,
        settings: {
          slidesPerRow: 5
        }
      },
      { breakpoint: 1024,
        settings: {
          slidesPerRow: 4
        }
      },
      { breakpoint: 900,
        settings: {
          slidesPerRow: 3
        }
      },
      { breakpoint: 800,
        settings: {
          slidesPerRow: 2
        }
      }
    ]
  };
  
  return (
    <Container>
      <Slider {...settings}>
        {items.map((item: any) => (
          <div>
            <MasonryItem data={item} />
          </div>
        ))}
      </Slider>
    </Container>
  )
}

SlickListing.defaultProps = {
  items: [],
}

export default SlickListing;
