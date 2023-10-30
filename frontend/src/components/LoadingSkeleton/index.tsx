import React, { PropsWithChildren } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
    count: number;
    wrapper?: React.FunctionComponent<PropsWithChildren<unknown>>
    circle?: boolean;
    className?: string;
    containerClassName?: string;
    containerTestId?: string;
    style?: React.CSSProperties;
    height: number | string;
    width: number | string;
    inline?: boolean;
    duration?: number;
    borderRadius?: number;
}

const LoadingSkeleton = (props: Props) => {
    const { 
        count,
        circle, 
        containerClassName, 
        height, 
        width, 
        inline,
        wrapper,
        duration,
        borderRadius,
    } = props;
    
    return(
        <Skeleton
            count={count}
            circle={circle}
            height={height}
            width={width}
            inline={inline}
            wrapper={wrapper}
            duration={duration}
            containerClassName={containerClassName}
            borderRadius={borderRadius}
        />
    );
};

export default LoadingSkeleton;