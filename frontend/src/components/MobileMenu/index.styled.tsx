import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const Menu = tw.div`
  absolute
  top-full
  bg-white
  right-0
  left-0
  bg-opacity-90
  shadow-md
`;

export const Actions = tw.div`
  flex
  flex-col
  gap-4
  p-5
  sm:hidden
`;

export const CustomSignInBtn = styled.button`
  background: #0C0534;
  border-radius: 4px;
`;

export const SignInBtn = tw(CustomSignInBtn)`
  text-white
  py-2
  px-10
`;

export const CustomRatingBtn = styled.button`
  background: #FFFFFF;
  border-radius: 4px;
`;

export const RatingBtn = tw(CustomRatingBtn)`
  text-neutral-100
  py-2
  px-10
  border-neutral-100
  border
`;
