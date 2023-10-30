import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export default function useDeviceDetect() {
    const [isMobile, setMobile] = useState(window.innerWidth < 768 ? true : false);
  
    useLayoutEffect(() => {
      const updateSize = (): void => {
        setMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', debounce(updateSize, 250));
      return (): void => window.removeEventListener('resize', updateSize);
    }, []);
  
    return { isMobile };
}
  