import { memo, useEffect, useRef, useState } from "react";
import Filter from '@assets/filter.svg';
import Search from '@assets/Search.svg';
import HideFilter from '@assets/hide-filter.svg';
import Right from '@assets/Right.svg';
import { LeftButton, RightButton } from "../../index.styled";
import styles from './index.module.css';
import { KeywordSuggestions } from "@/models/LexicaModel";

interface Props {
    handleShowFilter: () => void;
    showSidebar: boolean;
    suggestions: KeywordSuggestions[] | string[];
}

const KeywordSuggestion = ((props: Props) => {
    const { showSidebar, handleShowFilter, suggestions } = props;
    const suggestions1 = ['anh', 'suggestions', 'KeywordSuggestion', 'suggestions value', 'duc anh', 'le duc anh', 'papagroup', 'heniken', 'Tin chuyen nhuong', 'arsenal', 'Grandnit Xhaka']
    const currentScrollPosition = useRef(0);
    const scrollAmount = useRef(300);
    // console.log(suggestions, 'suggestions')
    
    useEffect(() => {
        function cb() {
            const sCont: HTMLDivElement | null = document.querySelector('.storys-container');
            const hScroll: HTMLDivElement | null = document.querySelector('.horizontal-scroll');
            const btnRight: HTMLElement | null = document.getElementById('right_btn');
            const btnRightWapper: HTMLElement | null = document.getElementById('right-button');
            if (sCont && hScroll && btnRight && btnRightWapper) {
                const maxScroll = -sCont.offsetWidth + hScroll.offsetWidth;
                if (currentScrollPosition.current <= maxScroll) {
                    btnRightWapper.style.opacity = '0';
                } else {
                    btnRightWapper.style.opacity = '1';
                }
            }
        }
        window.addEventListener('resize', cb);
        cb();
        return () => {
          window.removeEventListener('resize', cb);
        };
    });

    const handleFilter = () => {
        handleShowFilter();
    }

    const handleScroll = (check: number) => {
        const sCont: HTMLDivElement | null =
            document.querySelector('.storys-container');
        const hScroll: HTMLDivElement | null =
            document.querySelector('.horizontal-scroll');
        const btnRight: HTMLElement | null = document.getElementById('right_btn');
        const btnLeft: HTMLElement | null = document.getElementById('left_btn');

        const btnRightWapper: HTMLElement | null = document.getElementById('right-button');
        const btnLeftWapper: HTMLElement | null = document.getElementById('left-button');

        if (sCont && hScroll && btnRight && btnLeft && btnRightWapper && btnLeftWapper) {
            const maxScroll = -sCont.offsetWidth + hScroll.offsetWidth;
            currentScrollPosition.current += check * scrollAmount.current;
            if (currentScrollPosition.current >= 0) {
                currentScrollPosition.current = 0;
                btnLeftWapper.style.opacity = '0';
            } else {
                btnLeftWapper.style.opacity = '1';
            }

            if (currentScrollPosition.current < maxScroll) {
                currentScrollPosition.current = maxScroll;
                btnRightWapper.style.opacity = '0';
            } else {
                btnRightWapper.style.opacity = '1';
            }
            sCont.style.left = currentScrollPosition.current + 'px';
        }
    };

    return(
        <div className={`relative ${suggestions1.length > 0 ? 'h-20' : ''} mb-5 flex mx-16`}>
            <div className={`flex justify-start flex-row items-center ${showSidebar ? 'w-[25%] duration-700' : 'w-[120px] duration-700'}`} onClick={handleFilter}>        
                <div className={`w-full bg-violet-3 px-9 py-3 text-[#503981] flex justify-between rounded-xl filter-button cursor-pointer`} >
                    <div className="flex">
                        <img alt="filter" src={Filter} style={{ width: '15px' }}/>
                        <span className="ml-2">Filter</span>
                    </div>
                    <div className="flex items-center">
                        <img alt="hide-filter" src={HideFilter} style={{ width: '15px' }}/>
                    </div>
                </div>
            </div>
            <div className="relative w-[calc(100vw-25px)] h-full ml-3">
                <div className="w-full h-full relative overflow-x-hidden horizontal-scroll flex flex-row justify-between items-center">
                    <div className="flex justify-start flex-row items-center absolute left-0 transition delay-150 storys-container">
                        {suggestions.map((suggestion: any, index: number) => (
                            <div key={suggestion.facet || suggestion} className={`mx-2 px-4 flex items-center cursor-pointer w-max py-3 rounded-xl border-[1px] border-[#CECDD6]`} >
                                <p className="mr-2 font-normal text-sm leading-[21px]">{suggestion.facet || suggestion}</p>
                                <img alt="search" src={Search} style={{ width: '16px' }}/>
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div className={`${styles.leftButton}`} id="left-button">
                    <img
                        alt="Fail icon" 
                        onClick={() => handleScroll(1)}
                        src={Right}
                        id="left_btn"
                    />
                </div>
                <div className={`${styles.rightButton}`} id="right-button">
                    <img
                        alt="Fail icon"    
                        onClick={() => handleScroll(-1)}
                        src={Right}
                        id="right_btn"
                    />
                </div>
            </div>
        </div>
    );
});

export default memo(KeywordSuggestion);