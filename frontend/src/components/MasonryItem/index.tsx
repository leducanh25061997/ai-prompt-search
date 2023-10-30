import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';

import {
  CardItem,
  ImageItem,
  HeartBtn,
} from './index.styled';

import HeartIcon from '@components/Icons/HeartIcon';
import MoreAction from '@components/MoreAction';
import EditIcon from '@components/Icons/EditIcon';
// import PictureIcon from '@components/Icons/PictureIcon';
import DownloadIcon from '@components/Icons/DownloadIcon';
import ShareIcon from '@components/Icons/ShareIcon';

import LexicaLogo from '@assets/LexicaLogo.svg';
import OpenArtLogo from '@assets/OpenArtLogo.svg';
import ShortIconWhite from '@assets/ShortIconWhite.svg';
import Spinner from '@components/Spinner';
import { AppContext } from '@context/AppContext';
import { NavLink } from 'react-router-dom';
import TrackerService from '@/services/TrackerService';
import { FilterTrackerParams } from '@/types/Filter';
import { Tracker } from '@/types/Enum';
import { logEvent } from '@firebase/analytics';
import { analytics } from '@/utils/firebaseConfig';
import { useLocation, useNavigate } from 'react-router';
import queryString from 'query-string';
import { useScrollLock } from '@/hooks/useScrollLock';

type MasonryItemProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number || PropTypes.string,
    caption: PropTypes.string,
    src: PropTypes.string,
    srcSmall: PropTypes.string,
    onClickItem: PropTypes.func,
    onRemix: PropTypes.func,
    minHeight: PropTypes.string.isRequired,
    source: PropTypes.string,
    isLoading: PropTypes.bool,
    title: PropTypes.string || '',
  }).isRequired,
  wrapper: PropTypes.any
};

const actions = [
  {
    value: 'remix',
    label: 'Remix',
    icon: <EditIcon />
  },
  {
    value: 'download',
    label: 'Download',
    icon: <DownloadIcon />
  },
  {
    value: 'share',
    label: 'Share',
    icon: <ShareIcon />
  }
];

const MasonryItem = ({
  wrapper,
  data: { src, srcSmall, caption, onClickItem, onRemix, minHeight, source, isLoading, id, title }, data
}: MasonryItemProps) => {
  const { favoriteData, setFavoriteData } = useContext(AppContext);
  const { lockScroll } = useScrollLock();
  const navigate = useNavigate();
  const location = useLocation();
  const isActiveHeartCtx = id ? favoriteData[id] : false;

  const handleActive = (e: any) => {
    e.stopPropagation();
    if (setFavoriteData) {
      if (id) {
        const params: FilterTrackerParams = {
          user_id: 1,
          results_id: Number(id),
          action: Tracker.LIKE,
        };
        TrackerService(params);
        setFavoriteData({ ...favoriteData, [`${id}`]: !isActiveHeartCtx });
      }
    }
  }

  const handleClickItem = async (itemTitle?: string | null, itemId?: number | null) => {
    if (isLoading) return;
    if (itemTitle && itemId) {
      navigate(
        {
          pathname: location.pathname,
          search: `?${queryString.stringify(
            {
              imgaeId: itemId,
              title: itemTitle,
            },
            { arrayFormat: 'bracket', skipNull: true, skipEmptyString: true }
          )}`,
        },
        { replace: true }
      );
      fetchTracker(Tracker.VIEW);
      logEvent(analytics, 'image_view');
      lockScroll();
      wrapper && wrapper.current?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      // window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      // document.title = itemTitle || 'Galerie';
      
      if (onClickItem) onClickItem(data);
    }
    
  };

  const handleClickMoreAction = (e: any) => {
    e.stopPropagation();
  };
  
  const handleSelectMoreAction = (e: any) => {
    if (e.value === "remix") {
      fetchTracker(Tracker.REMIX);
      if (onRemix) onRemix(data.caption); 
    }
    else if (e.value === "download") {
      fetchTracker(Tracker.DOWNLOAD);
      const anchor: any = document.createElement('a');
      if (src?.includes('webp')) {
          // TODO: below ony view new tab
        const anchor: any = document.createElement('a');
        anchor.href = src;
        anchor.download = src;
        anchor.target = "_blank";
        document.body.appendChild(anchor);
        anchor.click();
      } else {
        anchor.href = src;
        anchor.download = src;
        document.body.appendChild(anchor);
        anchor.click();
      }
      document.body.removeChild(anchor);
    } else {
      fetchTracker(Tracker.SHARE);
    }
  };

  const fetchTracker = (type: Tracker) => {
    const params: FilterTrackerParams = {
      user_id: 1,
      results_id: Number(data.id),
      action: type,
    }
    TrackerService(params)
  }

  const renderSourceImg = (image: string) => {
    switch (image) {
      case 'lexica':
        return <img src={LexicaLogo} alt='Lexica' />;
      case 'openart':
        return <img src={OpenArtLogo} alt='OpenArt' />;
      default:
        return <img src={ShortIconWhite} style={{ height: 32 }} alt='Galerie' />;
    }
  };
  
  return (
    <CardItem minHeight={minHeight}>
      {isLoading ? <Spinner /> : Object.keys(data).length > 0 && (
        <React.Fragment>
          <div onClick={() => handleClickItem(title, id)} className="relative">
            <ImageItem alt={data.title || ''} src={srcSmall || src || ''} />
            <div className="overlay-social"></div>
            <div className="overlay-caption">
              {caption && caption.length > 45 ? caption?.slice(0, 45) + '...' : caption}
            </div>
          </div>
          {!isLoading && <div className="absolute top-2.5 left-2.5 overlay-button">
            {source && renderSourceImg(source)}
          </div>}
          {!isLoading && <div className="absolute top-2.5 right-2.5 flex overlay-button">
            <MoreAction data={actions} caption={caption} imageUrl={src} onSelect={handleSelectMoreAction} onClick={handleClickMoreAction} />
            <HeartBtn onClick={handleActive}>
              <HeartIcon active={isActiveHeartCtx} />
            </HeartBtn>
          </div>}
        </React.Fragment>
      )}
    </CardItem>
  
  );
};

MasonryItem.propTypes = propTypes;

MasonryItem.defaultProps = {
  data: {
    src: '',
    caption: '',
    srcSmall: '',
    minHeight: '',
    source: '',
    id: '',
    onClickItem: () => { },
    onRemix: () => { },
    isLoading: false,
    title: '',
  }
}

export default MasonryItem;
