import tw from "tailwind-styled-components";
import styled from 'styled-components';

export const CustomContainer = styled.div`
  width: 126px;
  height: 92px;
  background: #FFFFFF;
  border: 1px solid #CECDD6;
  border-radius: 8px;
  margin-right: 12px;
  cursor: pointer;
  background-color: #D9D9D9;
  background-image: url("${(props: any) => props.image ? props.image : ""}");
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    border: 1px solid #0C0534;
  }
`;

export const Container = tw(CustomContainer)`
  flex
`;

export const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  box-orient: vertical;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin-top: 35px;
  color: white;
  background: rgba(0, 0, 0, 0.1);
  text-shadow: 2px 2px 5px white;
  padding: 8px;
`;
