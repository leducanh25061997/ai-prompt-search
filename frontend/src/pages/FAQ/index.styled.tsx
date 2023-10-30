import styled from 'styled-components';
import tw from "tailwind-styled-components";

export const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  margin-bottom: 12px;
`;

export const Container = tw.div`
  sm:w-1/2
  sm:px-0
  w-full
  ml-auto
  mr-auto
  px-4
`;

export const PanelText = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
