import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomContainer = styled.div`
  .slick-next, .slick-prev {
    transform: none;
    top: 40%;
  }
  .slick-prev {
    @media (max-width: 425px) {
      display: none !important;
    }
    left: -25px;
  }
  .slick-next {
    @media (max-width: 425px) {
      display: none !important;
    }
    right: -30px;
  }
  .slick-prev[currentslide="0"] {
    display: none !important;
  }
  margin-bottom: 43px;
  .slick-slide img {
    height: 189px;
    object-fit: cover;
  }
  .slick-slide>div>div {padding: 8px;}
`;

export const Container = tw(CustomContainer)`
  w-full
  md:px-16
  px-4
`;
