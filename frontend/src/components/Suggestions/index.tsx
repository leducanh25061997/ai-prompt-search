import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SuggestionItem from '@components/SuggestionItem';
import RightArrowIcon from '@components/Icons/RightArrowIcon';
import LeftArrowIcon from '@components/Icons/LeftArrowIcon';
import {
  Container,
  Title
} from './index.styled'

type SuggestionsProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  items: PropTypes.shape({}).isRequired,
  onClickItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Suggestions = ({ items, onClickItem, title }: SuggestionsProps) => {
  const settings = {
    dots: false,
    speed: 300,
    slidesToShow: 5,
    centerMode: false,
    variableWidth: true,
    infinite: true,
    prevArrow: <button className='slick-arrow slick-prev'><LeftArrowIcon /></button>,
    nextArrow: <button className='slick-arrow slick-next'><RightArrowIcon /></button>,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <Container>
      <Title>
        {title}
      </Title>
      <Slider {...settings}>
        {Object.entries(items).map(([key, val]: any) => (
          <SuggestionItem
            image={val.image}
            key={key} onClickItem={() => onClickItem(key, val.value)} text={val.value || ''} />
        ))}
      </Slider>
    </Container>
  )
}

Suggestions.defaultProps = {
  items: {},
  onClickItem: () => { },
  title: '',
}

export default Suggestions;
