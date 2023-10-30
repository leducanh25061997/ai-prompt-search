import styled from 'styled-components';
import tw from "tailwind-styled-components";
import { MAX_Z_INDEX } from '@config/const';

export const CustomTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
`;

export const Title = tw(CustomTitle)`

`;

export const CustomTextCount = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;
  color: #6D6985;
  md:ml-16
  ml-4
`;

export const TextCount = tw(CustomTextCount)`
  mb-[10px]
`;

export const SecondTitle = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 40px;
  margin-left: 12px;
`;

export const SecondTitleSection = tw.div`
  flex
  items-center
  mb-2
`;

export const SearchContainer = styled.div`
  @media (min-width: 1310px) {
    &.sticky {
      position: fixed;
      top: -29px;
      left: 0;
      right: 0;
      z-index: ${MAX_Z_INDEX};
      background: white;
      box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.08);
    }
  }
`;

export const LogoWithSearch = styled.img`
  @media (min-width: 1310px) {
    position: fixed;
    top: 1.25rem;
    left: 4rem;
    display: none;
    &.sticky {
      display: block;
    }
  }
  display: none;
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

export const CustomSocialBtn = styled.button`
  width: 44px;
  height: 44px;
  @media (min-width: 1310px) {
    position: fixed;
    top: 1.25rem;
    &.twitter {
      right: 14rem;
    }
    &.instagram {
      right: 18rem;
    }
    &.sticky {
      display: flex;
    }
  }
  display: none;
`;

export const SocialBtn = tw(CustomSocialBtn)`
  rounded-full
  flex
  justify-center
  items-center
  hover:bg-violet-3
`;

export const CustomSearchWrapper= styled.div`
  @media (max-width: 425px) {
    
  }
  @media (max-width: 640px) {
    
  }
`;

export const SearchWrapper = tw(CustomSearchWrapper)`
  lg:w-2/3
  md:w-2/3
  sm:w-full
  w-full
  xl:mr-8
  xl:ml-8
  xs:mx-2
`;

export const CustomSettingBtn = styled.button`
  width: 56px;
  height: 56px;
  margin-left: 16px;
`;

export const SettingBtn = tw(CustomSettingBtn)`
  rounded-full
  md:flex
  justify-center
  items-center
  bg-violet-3
  hidden
`;

export const CustomRightSection = styled.div`
  width: 30%;
  @media (max-width: 1500px) {
    width: 40%;
  }
  @media (max-width: 1200px) {
    width: 50%;
  }
  @media (max-width: 1150px) {
    width: 100%;
  }
`

export const RightSection = tw(CustomRightSection)`
  w-[35%]
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

// @media (max-width: 640px) {
//   padding-left: 1rem;
//   padding-right: 1rem;
// }

export const CustomNav = styled.nav`
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
  text-white
`;

export const searcherInput = styled.div`
  width: 480px;
  height: 30px;
  border: 0px solid #ffffff;
  border-bottom: 2px solid #777777;
  border-radius: 2px;
  font-size: 2em;
  color: #555555;
  padding: 5px 10px 5px 10px;

  &:focus {
    outline-style: none;
  }
`;

export const LeftButton = styled.div`
  opacity: 0;
  position: absolute;
  left: 7px;
  top: 6px;
  padding: 20px 0;
  width: 100px;
  display: flex;
  justify-content: start;
  background: linear-gradient(1200deg, #FFFFFF 25%, rgba(255, 255, 255, 0) 100%);
  img {
    width: 24px;
    cursor: pointer;
    transform: rotate(180deg);
  }
`;

export const RightButton = styled.div`
  position: absolute;
  right: 0px;
  top: 6px;
  padding: 20px 0;
  width: 100px;
  display: flex;
  justify-content: end;
  background: linear-gradient(270deg, #FFFFFF 25%, rgba(255, 255, 255, 0) 100%);
  img {
    width: 24px;
    cursor: pointer;
  }
`;

export const CustomMasonry = styled.div`
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
  }
  .my-masonry-grid_column {
    margin-left: 20px; /* gutter size */
    background-clip: padding-box;
  }
  .my-masonry-grid_column:first-child {
    margin-left: 0px; /* gutter size */
  }
  .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 20px;
  }
`;


export const CustomCheckboxes = styled.div`
  width: 100%;
  margin-top: 10px;
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #3D375D;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #F4EEF6;
    border: 1.12667px solid #9E9BAE;
    border-radius: 4px;
  }

  .container input:checked ~ .checkmark {
    background-color: #2196F3;
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }
  
  .container .checkmark:after {
    left: 9px;
    top: 2px;
    width: 8px;
    height: 15px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;