import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomButton = styled.button`
  position: ${(props: any) => props.sticky ? 'fixed' : ''};
  right:  ${(props: any) => props.sticky || props.stickyDefault ? '12px' : ''};
`;

export const Button = tw(CustomButton)`
  w-10
  sm:hidden
`;
