import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const Container = tw.div`
  flex
  gap-3
  w-full
  h-auto
  md:px-16
  px-4
  flex-wrap
`;

export const CustomSkeletonItem = styled.div`
  width: 259px;
  height: 15rem;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const SkeletonItem = tw(CustomSkeletonItem)`
  rounded-xl
  bg-gray-200
  animate-pulse
`;
