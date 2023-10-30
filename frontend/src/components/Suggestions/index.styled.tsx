import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomContainer = styled.div`
  .slick-next, .slick-prev {
    transform: none;
    top: 4px;
  }
  .slick-prev {
    left: -50px;
    @media (max-width: 425px) {
      display: none !important;
    }
  }
  .slick-next {
    right: -30px;
    @media (max-width: 425px) {
      display: none !important;
    }
  }
  .slick-prev[currentslide="0"] {
    display: none !important;
  }
  margin-bottom: 25px;
`;

export const Container = tw(CustomContainer)`
  lg:w-[57%]
  md:w-2/3
  sm:w-2/3
  md:px-0
  w-full
  px-4
  mr-auto
  ml-auto
  mt-3
`;

export const Title = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #503981;
  margin-bottom: 0.25rem;
`;
