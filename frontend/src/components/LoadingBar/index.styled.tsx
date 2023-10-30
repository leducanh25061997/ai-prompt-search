import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  z-index: 1;
  width: 100%;
  height: 5px;
`;

export const Container = tw(CustomContainer)`
  flex
  items-center
  justify-center
`;
