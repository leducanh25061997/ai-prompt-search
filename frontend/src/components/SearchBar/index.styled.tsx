import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const Wrapper = tw.div`
  flex
  items-center
  bg-violet-3
  rounded-full
  hover:ring-1
  flex-auto
`;

// hover:border-blue-primary
//   hover:ring-1
//   hover:outline-none

export const CustomTextarea = styled.textarea`
  height: 46px;
  line-height: 24px;
  resize: none;
  overflow: hidden;
`;

export const Textarea = tw(CustomTextarea)`
  w-full
  py-2
  px-6
  leading-tight
  focus:outline-none
  border-none
  bg-violet-3
  text-lg
  rounded-full
`;

export const Input = tw.input`
  w-full
  py-[6px]
  px-6
  leading-tight
  focus:outline-none
  hover:outline-none
  border-none
  text-lg
  rounded-full
  bg-transparent
`;

export const CustomSearchBtn = styled.button`
  width: 72px;
  height: 32px;
`;

export const SearchBtn = tw(CustomSearchBtn)`
  bg-neutral-100
  text-white
  rounded-full
  p-2
  focus:outline-none
  flex
  items-center
  justify-center
`;

export const WrapperAIToggle = tw.div`
  flex
  items-center
  mt-4
  mb-4
`;

export const AIText = tw.div`
  ml-4
`;

export const ClearBtn = tw.div`
  cursor-pointer
  mr-2
`;

export const CustomSettinghBtn = styled.button`
  width: 56px;
  height: 56px;
  position: relative;
  right: -21px;
  width: 0px;
`;

export const SettingBtn = tw(CustomSettinghBtn)`
  rounded-full
`;
