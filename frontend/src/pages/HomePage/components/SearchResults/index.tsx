import MasonryListing from "@/components/MasonryListing";
import SkeletonLoading from "@/components/SkeletonLoading";
import { memo } from "react"
import { TextCount, Title } from "../../index.styled";

interface Props {
    displayLexicaImages: any[];
    isLoadingLexica: boolean;
}

const SearchResults = memo(({ displayLexicaImages, isLoadingLexica }: Props) => {

    return (
        <div className="flex-auto">
            <Title>Search results</Title>
            <TextCount>{displayLexicaImages?.length || 0} results</TextCount>
            {!isLoadingLexica ? <MasonryListing items={displayLexicaImages} /> : isLoadingLexica && <SkeletonLoading count={4} />}
    </div>
    )
});

export default SearchResults;