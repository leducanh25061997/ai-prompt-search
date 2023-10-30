import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const ApplyBtn = styled.button`
  background: #0C0534;
  width: auto;
  height: 40px;
  padding: 10px 40px;
  border: 1px solid #9E9BAE;
  border-radius: 5px;
  line-height: 16px;
  display: flex;
  align-items: center;
  &:hover {
    border-color: #0C0534;
  }
  @media (max-width: 640px) {
    padding: 10px 90px;
  }
`;

export const ClearAllBtn = styled.button`
  display: flex;
  align-items: center;
`;