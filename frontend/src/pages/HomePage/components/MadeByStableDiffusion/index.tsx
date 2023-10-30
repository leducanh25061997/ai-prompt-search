import { memo, PropsWithChildren } from "react"
import { SecondTitle, SecondTitleSection } from "../../index.styled";
import DfVerIcon from '@/assets/DfVer.svg';
import ViewMore from "@/components/ViewMore";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactMasonry from '@/components/ReactMasonry';

interface Props {
    displaySDImages: any[];
    isViewMoreSD: boolean;
    handleViewMoreSD: () => void;
    title: string;
}

const MadeByStableDiffusion = memo(({ displaySDImages, isViewMoreSD, handleViewMoreSD, title }: Props) => {
    function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
        return <span style={{ marginRight: '0.5rem' }}>{children}</span>
    }

    return (
        <>
            <SecondTitleSection>
                <img src={DfVerIcon} alt="Made by Stable Diffusion v2.1" />
                <SecondTitle>{title}</SecondTitle>
            </SecondTitleSection>
            {displaySDImages.length === 0 ? (
                <Skeleton
                    count={12}
                    wrapper={InlineWrapperWithMargin}
                    inline
                    width={'49%'}
                    height={200}
                />
            ) : (
                <ReactMasonry
                    breakpointCols={{ default: 2 }}
                    data={displaySDImages}
                />
            )}
            <ViewMore onClick={handleViewMoreSD} loading={isViewMoreSD} />
        </>
    )
});

export default MadeByStableDiffusion;