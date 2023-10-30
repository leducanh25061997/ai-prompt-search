import {
  Container,
} from './index.styled';

import LogoWhite from '@assets/LogoWhite.svg';

const Footer: React.FC = () => {
  return (
    <Container>
      <img alt="Logo" src={LogoWhite} />
    </Container>
  );
}; 

export default Footer;
