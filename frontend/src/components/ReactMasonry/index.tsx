import { CustomMasonry } from "./index.styled";
import Masonry from 'react-masonry-css';
import MasonryItem from "../MasonryItem";

interface Props {
    breakpointCols: BreakpointColumnsObj;
    data: any[];
    wrapper?: any;
}

interface BreakpointColumnsObj {
    [x: string]: number;
}

const ReactMasonry = (props: Props) => {
    const { breakpointCols, data, wrapper } = props;

    return(
        <CustomMasonry>
            <Masonry
                breakpointCols={breakpointCols}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {data.length > 0 && data.map((item: any, index: number) => {
                    return (
                        <div key={index}>
                            <MasonryItem data={item} wrapper={wrapper} />
                        </div>
                    );
                })}
            </Masonry>
        </CustomMasonry>
    );
};

export default ReactMasonry;

