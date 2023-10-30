import SpinnerIcon from '@assets/Spinner.svg';
import {
  Container,
} from './index.styled'


const Spinner: React.FC = () => {
  return (
    <Container>
      <img src={SpinnerIcon} alt="loading" />
    </Container>
  );
}; 

export default Spinner;
