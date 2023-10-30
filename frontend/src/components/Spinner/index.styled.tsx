import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  z-index: 1;
  width: 100%;
`;

export const Container = tw(CustomContainer)`
  flex
  items-center
  justify-center
`;
