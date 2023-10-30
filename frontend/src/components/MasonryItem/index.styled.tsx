import styled from 'styled-components';
import tw from "tailwind-styled-components";

export const CardItem: any = styled.div`
  display: flex;
  flex-direction: column;
  background: #E7E6EB;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  transition: transform 100ms ease-in-out;
  width: 100%;
  min-height: ${(props: any) => props.minHeight};
  height: auto;
  cursor: pointer;
  position: relative;
  
  .overlay-social {
    position: absolute; 
    bottom: 0;
    top: 0;
    background: rgb(0, 0, 0);
    background: rgba(0, 0, 0, 0.5); /* Black see-through */
    width: 100%;
    transition: .5s ease;
    opacity:0;
    color: white;
    font-size: 14px;
    padding: 0.5rem;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
  }

  .overlay-button {
    opacity:0;
    transition: .5s ease;
  }
  
  .overlay-caption {
    position: absolute; 
    bottom: 0; 
    width: 100%;
    transition: .5s ease;
    opacity:0;
    color: white;
    font-size: 14px;
    padding: 0.5rem;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
  
  &:hover {
    .overlay-caption, .overlay-social, .overlay-button {
      opacity: 1;
    }
  }
`;

export const ImageItem = styled.img`
  width: 100%;
  display: block;
  border-radius: 16px;
  display: block;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
`;

export const HeartBtn = styled.div`
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const MoreActionContainer = tw.div`
  flex
  items-start
`;
