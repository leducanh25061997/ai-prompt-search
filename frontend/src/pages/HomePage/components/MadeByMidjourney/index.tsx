import ViewMore from "@/components/ViewMore";
import { memo, PropsWithChildren } from "react"
import { SecondTitleSection, SecondTitle } from "../../index.styled";
import MidJourneyIcon from '@/assets/MidJourney.svg';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactMasonry from '@/components/ReactMasonry';

interface Props {
    displayMJv4Images: any[];
    handleViewMoreMJv4: () => void;
    isViewMoreJv4: boolean;
}

const MadeByMidjourney = memo(({ displayMJv4Images, handleViewMoreMJv4, isViewMoreJv4 }: Props) => {
    function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
        return <span style={{ marginRight: '0.5rem' }}>{children}</span>
    }

    return (
        <>
            <div>
                <SecondTitleSection>
                    <img src={MidJourneyIcon} alt="Made by Midjourney SD Runpod" />
                    <SecondTitle>
                        Made by Open Midjourney
                    </SecondTitle>
                </SecondTitleSection>
                {displayMJv4Images.length === 0 ? (
                    <Skeleton
                        count={12}
                        wrapper={InlineWrapperWithMargin}
                        inline
                        width={'24%'}
                        height={200}
                    />
                ) : (
                    <ReactMasonry
                        breakpointCols={{ default: 2 }}
                        data={displayMJv4Images}
                    />
                )
            }        
            <ViewMore onClick={handleViewMoreMJv4} loading={isViewMoreJv4} />
            </div>
        </>
    )
});

export default MadeByMidjourney;