import { Link } from "react-router-dom";

import {
  Menu,
  Actions,
  // SignInBtn,
  RatingBtn
} from './index.styled';

const MobileMenu: React.FC = () => {
  return (
    <Menu id="mobile_menu">
      <Actions>
        {/* <RatingBtn>Rating</RatingBtn> */}
        {/* <SignInBtn>+ Create</SignInBtn> */}
        <Link className="contents" to="/faq"><RatingBtn>FAQ</RatingBtn></Link>
      </Actions>
    </Menu>
  );
}; 

export default MobileMenu;
