
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

import DotIcon from '@components/Icons/DotIcon';

import {
  MoreBtn,
  MenuIcon
} from './index.styled';

type MoreActionProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  onClick: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.element,
  })),
  imageUrl:  PropTypes.string,
  caption:  PropTypes.string,
};

const MoreAction = ({ data, onSelect, imageUrl, caption }: MoreActionProps) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
  };
  
    return (
      <Menu align="start" direction="bottom" onItemClick={onSelect} onClick={handleClick} menuButton={<MenuButton onClick={handleClick}><MoreBtn><DotIcon /></MoreBtn></MenuButton>} transition>
        {data?.map(({ value = '', label = '', icon }: any) => value === 'share' ? (
          <SubMenu key={value} label={
            <>
              <MenuIcon>{icon}</MenuIcon>
              <div>{label}</div>
            </>
          }>
            <MenuItem>
              <FacebookShareButton
                url={imageUrl || ''}
                quote={caption || ''}
                className="flex"
              >
                <FacebookIcon className="mr-2"  size={18} round />
                <div>Facebook</div>
              </FacebookShareButton>
            </MenuItem>
            <MenuItem>
              <TwitterShareButton
                url={imageUrl || ''}
                title={caption || ''}
                className="flex"
              >
                <TwitterIcon className="mr-2" size={18} round />
                <div>Twitter</div>
              </TwitterShareButton>
            </MenuItem>
          </SubMenu>
        ) : 
        (<MenuItem value={value} key={value}><div className="flex items-center">
          <MenuIcon>{icon}</MenuIcon>
          <div>{label}</div>
        </div></MenuItem>))}
      </Menu>
    )
};

MoreAction.defaultProps = {
  data: [],
  onClick: () => {},
  onSelect: () => {},
  imageUrl:  '',
  caption:  '',
};

export default MoreAction;
