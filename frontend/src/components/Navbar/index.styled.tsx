import tw from "tailwind-styled-components";
import styled from 'styled-components';
import { MAX_Z_INDEX } from '@config/const';

export const CustomNav = styled.nav`
  height: 96px;
  @media (max-width: 640px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  &.sticky {
    position: unset;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${MAX_Z_INDEX};
    background: white;
    @media (max-width: 1310px) {
      position: fixed;
    }
  }
  .logo {
    cursor: pointer;
    &.sticky {
      position: fixed;
      z-index: ${MAX_Z_INDEX + 1};
    }
    &.sticky-default {
      z-index: ${MAX_Z_INDEX + 1};
    }
  }
  &.sticky-default {
    top: 0;
    left: 0;
    right: 0;
    position: sticky;
    background: white;
  }
`;

export const Nav = tw(CustomNav)`
  flex
  justify-between
  items-center
  px-16
  py-5
  relative
`;

export const CustomActions = styled.div`
  &.sticky {
    z-index: ${MAX_Z_INDEX + 1};
    position: fixed;
    right: 4rem;
  }
  &.sticky-default {
    z-index: ${MAX_Z_INDEX + 1};
  }
`;

export const Actions = tw(CustomActions)`
  sm:flex
  hidden
  gap-4
  items-center
`;

export const CustomSignInBtn = styled.button`
  background: #0C0534;
  border-radius: 4px;
  @media (min-width: 1310px) {
    position: fixed;
    top: 1.25rem;
    right: 4rem;
    &.sticky {
      display: block;
    }
  }
  display: none;
`;

export const SignInBtn = tw(CustomSignInBtn)`
  text-white
  py-2
  px-10
  cursor-pointer
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

export const CustomSocialBtn = styled.button`
  width: 44px;
  height: 44px;
`;

export const SocialBtn = tw(CustomSocialBtn)`
  rounded-full
  flex
  justify-center
  items-center
  hover:bg-violet-3
`;

export const CustomNavLink = styled.div`
  font-weight: 500;
  &:hover, .active {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
  }
`;

export const CustomSignUpBtn = styled.button`
  background: #0C0534;
  border-radius: 4px;
`;

export const SignInUp = tw(CustomSignUpBtn)`
  text-white
  py-2
  px-10
  cursor-pointer
`;