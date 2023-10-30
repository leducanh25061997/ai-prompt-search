import styled from 'styled-components';
import tw from "tailwind-styled-components";

export const CustomContainer = styled.div`
 
  @media (max-width: 640px) {
    margin-bottom: 80px;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export const Container = tw(CustomContainer)`
  
`;

// padding-left: 4rem;
// padding-right: 4rem;