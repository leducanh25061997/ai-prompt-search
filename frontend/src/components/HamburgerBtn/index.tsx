import useDeviceDetect from '@/hooks/useDeviceDetect';
import PropTypes from 'prop-types';

import {
  Button
} from './index.styled';

type HamburgerBtnProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  toggle: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  sticky: PropTypes.bool,
  stickyDefault: PropTypes.bool,
  color: PropTypes.string,
};

const HamburgerBtn = ({
  toggle,
  onToggle,
  sticky,
  stickyDefault,
  color,
}: HamburgerBtnProps) => {
  const { isMobile } = useDeviceDetect();
  const handleToggle = () => {
    onToggle(!toggle);
  }
  
  return (
    <Button sticky={sticky} stickyDefault={stickyDefault} id="menu_btn" className="w-10 sm:hidden" onClick={handleToggle}>
      {toggle ? (<svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isMobile ? color ? color : "#FFFFFF" : "currentColor"}
        viewBox="0 0 16 16"
      >
        <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"></path>
      </svg>) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isMobile ? color ? color : "#FFFFFF" : "currentColor"}
          viewBox="0 0 16 16"
        >
          <path d="M2.5 12a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"></path>
        </svg>
      )}
    </Button>
  );
};

HamburgerBtn.propTypes = propTypes;

HamburgerBtn.defaultProps = {
  toggle: false,
  sticky: false,
  stickyDefault: true,
  onToggle: () => {},
  color: '',
}

export default HamburgerBtn;
