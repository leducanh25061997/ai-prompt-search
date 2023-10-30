import tw from "tailwind-styled-components";
import styled from 'styled-components';

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

export const HeartBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #0C0534;
`;

export const ActionBtn = styled.button`
  width: auto;
  height: 40px;
  padding: 10px 20px;
  border: 1px solid #0C0534;
  border-radius: 5px;
  line-height: 16px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  @media (max-width: 640px) {
    padding: 10px 10px;
  }
`;

export const ActionText = styled.div`
  margin-left: 8px;
  font-size: 14px;
  @media (max-width: 500px) {
    display: none;
  }
`;

export const SourceImage = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
`;
