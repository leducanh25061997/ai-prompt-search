import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomContainer = styled.div`
  background: #121212;
  height: 360px;
  margin-top: 50px;
`;

export const Container = tw(CustomContainer)`
  px-16
  py-12
`;
