/* eslint-disable react-hooks/exhaustive-deps */

import {
    Title,
    TextCount,
    RightSection,
} from './index.styled';
import React, { Children, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { isLexicaResponse, KeywordSuggestions } from "@/models/LexicaModel";
import TrendingService from "@/services/TrendingService";
import StyleSuggestion from "./StyleSuggestion";
import InfiniteScroll from 'react-infinite-scroll-component';
import { TrendingRequest } from "@/models/TrendingModel";
import { BadgeHomePage, Filter, Tracker } from "@/types/Enum";
import LexicaSearchService from "@/services/LexicaSearch";
import { FilterParams, FilterTrackerParams } from "@/types/Filter";
import { ProductionModelList } from "@/config/const";
import RunPodDiffusionService from "@/services/RunPodDiffusionService";
// import { toast } from "react-toastify";
import { isObject } from "@/utils/helpers";

import FilterIcon from '@assets/filter.svg';
import Search from '@assets/Search.svg';
import HideFilter from '@assets/hide-filter.svg';
import Right from '@assets/Right.svg';
import styles from './index.module.css';

import MadeByMidjourney from "../HomePage/components/MadeByMidjourney";
import MadeByStableDiffusion from "../HomePage/components/MadeByStableDiffusion";
import fetchJsonp from "fetch-jsonp";
import HeaderHomePage from "./components/HeaderHomePage";
import SendEmail from "./components/SendEmail";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ReactMasonry from "@/components/ReactMasonry";
import FilterHomePage from './components/FilterHomePage';
import TrackerService from '@/services/TrackerService';
import Sidebar from '@/components/Sidebar';
import useDeviceDetect from '@/hooks/useDeviceDetect';
import { analytics } from '@/utils/firebaseConfig';
import { logEvent } from '@firebase/analytics';
import { useLocation, useNavigate } from 'react-router';
import querystring from 'query-string';
import { debounce } from 'lodash';
interface badgeType {
    type: BadgeHomePage
    name: string;
}

interface Filters {
    model: string[];
    orientation: string[];
    resolution: string[];
}

interface CheckedType {
    model: string;
    orientation: string;
    resolution: string;
}

const HomePage = () => {
    const [isClickInput, setIsClickInput] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");
    const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);
    const [suggs, setSuggs] = useState<string[]>([]);
    const {
        setIsOpenModal,
        remixOnClick, 
        setSelectedImage,
        showSidebar, 
        setShowSidebar,
        isOpenModal
    } = useContext(AppContext);
    const [suggestions, setSuggestions] = useState<string[] | KeywordSuggestions[]>([]);
    const { isMobile } = useDeviceDetect();

    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const breakpointColumnsObj = {
        default: 5,
        1250: 5,
        1100: 4,
        1044: 4,
        900: 3,
        700: 2,
        500: 2,
    };
    const [displayTrendImages, setDisplayTrendingImages] = useState<any[]>([]);
    const [isLoadingTrend, setIsLoadingTrend] = useState<boolean>(true);
    const [isLiveSearch, setIsLiveSearch] = useState<boolean>(true);
    const [suggestStyles, setSuggestStyles] = useState<{ [key: string]: string }>({});
    const [selectBadge, setSelectBadge] = useState<BadgeHomePage>(BadgeHomePage.ALL);
    const badges: badgeType[] = useMemo(() => [
        {
            type: BadgeHomePage.ALL,
            name: 'All',
        },
        {
            type: BadgeHomePage.SEARCH_RESULTS,
            name: 'Search results',
        },
        {
            type: BadgeHomePage.ART_MADE_FOR_YOU,
            name: 'Art made for you',
        }
    ], []);
    const [filterParams, setFilterParams] = useState<FilterParams>({
        user_id: -1,
        keyword: '',
        limit: 20,
        page: 0,
        filters: {
            model: '',
            orientation: '',
            resolution: ''
        }
    });

    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    // Lexica 
    const [displayLexicaImages, setDisplayLexicaImages] = useState<any[]>([]);

    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState<boolean>(false);

    const [isRelevant, setIsRelevant] = useState<boolean | null>(null);
    const [displayMJv4Images, setDisplayMJv4Images] = useState<any[]>([]);

    const [isViewMoreJv4, setIsViewMoreJv4] = useState<boolean>(false);

    // SDv15 Runpod
    const [displaySDv15Images, setDisplaySDv15Images] = useState<any[]>([]);

    const [isViewMoreSDv15, setIsViewMoreSDv15] = useState<boolean>(false);

    // SDv2 Runpod
    const [displayWaifuSDImages, setDisplayWaifuSDImages] = useState<any[]>([]);

    const [isViewMoreSDv2, setIsViewMoreWaifuSD] = useState<boolean>(false);

    // SDv21 Runpod
    const [displaySDv21Images, setDisplaySDv21Images] = useState<any[]>([]);

    const [isViewMoreSDv21, setIsViewMoreSDv21] = useState<boolean>(false);

    const [checked, setChecked] = useState<CheckedType>({
        model: '',
        orientation: '',
        resolution: '',
    });
    const [filters, setFilters] = useState<Filters>({
        model: [],
        orientation: [],
        resolution: []
    });

    const currentScrollPosition = useRef(0);
    const scrollAmount = useRef(300);
    const [suggsKeywords, setSuggsKeywords] = useState<string>('');

    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchTrend();
    }, []);

    React.useEffect(() => {
        const params = querystring.parse(location.search, {
          arrayFormat: 'bracket',
        });
        if (params && Object.keys(params).length > 0) {
            if (params.keyword) {
                setFilterParams(params);
                const handleFetchData = debounce(() => handleSearchParallel(params, false), 300);
                handleFetchData();
                return () => handleFetchData.cancel();
            }
            if (params.imgaeId) {
                setIsOpenModal(true);
            }
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const wrapOnClickEventForData = (data: any, minHeight: string, source: string) => {
        return data?.length && data.map((item: any) => {
            return {
                ...item,
                onClickItem: (data: any) => {
                    // setSelectedImage({ source: data.source, ...item });
                    setIsOpenModal(true);
                },
                onRemix: (text: string) => {
                    const _filterParams = {
                        ...filterParams,
                        keyword: text || ''
                    }
                    setFilterParams(_filterParams);
                    handleSearchParallel(_filterParams, false);
                    // setPrompt(text);
                },
                minHeight,
                isLoading: false,
            }
        });
    }

    const fetchTrend = async (params?: TrendingRequest) => {
        setIsLoadingSuggestion(true);
        setIsLoadingTrend(true);
        setDisplayTrendingImages([]);
        let res = await TrendingService(params);
        if (res) {
            setSuggestions(res.keywordSuggestions || []);
            setIsLoadingSuggestion(false);
            if (res?.data?.length) {
                res.data = wrapOnClickEventForData(res.data, '100px', 'openart');
            }
            
            if (!isLexicaResponse(res)) {
                if (res?.data?.length) {
                    setDisplayTrendingImages([...displayTrendImages, ...res.data]);
                    
                    setSuggestStyles(StyleSuggestion(res?.data as any, 10, false));
                }
                
            }
            setIsLoadingTrend(false);
        }
       
    };

    const handleClearInput = () => {
        setFilterParams({
            ...filterParams,
            keyword: ''
        });
        onFilterToQueryString({})
        setPrompt('');
    };

    const handleClickInput = () => {
        setIsClickInput(true);
    };

    // const slowInferenceV2 = async (prompt: string) => {
    //     setIsViewMoreJv4(true);
    //     fetchRunpodService(prompt, 1, setDisplayMJv4Images,  ProductionModelList.MIDJOURNEY_v4, () => {
    //         fetchRunpodService(prompt, 3, setDisplayMJv4Images,  ProductionModelList.MIDJOURNEY_v4, () => {
    //             setIsViewMoreJv4(false);
    //         });
    //     });

    //     setIsViewMoreSDv15(true);
    //     fetchRunpodService(prompt, 1, setDisplaySDv15Images, ProductionModelList.STABLE_DIFFUSION_v15, () => {
    //         fetchRunpodService(prompt, 3, setDisplaySDv15Images, ProductionModelList.STABLE_DIFFUSION_v15, () => {
    //             setIsViewMoreSDv15(false);
    //         });
    //     });

    //     setIsViewMoreWaifuSD(true);
    //     fetchRunpodService(prompt, 1, setDisplayWaifuSDImages, ProductionModelList.WAIFU_DIFFUSION, () => {
    //         fetchRunpodService(prompt, 3, setDisplayWaifuSDImages, ProductionModelList.WAIFU_DIFFUSION, () => {
    //             setIsViewMoreWaifuSD(false);
    //         });
    //     });

    //     setIsViewMoreSDv21(true);
    //     fetchRunpodService(prompt, 1, setDisplaySDv21Images, ProductionModelList.STABLE_DIFFUSION_v21, () => {
    //         fetchRunpodService(prompt, 3, setDisplaySDv21Images, ProductionModelList.STABLE_DIFFUSION_v21, () => {
    //             setIsViewMoreSDv21(false);
    //         });
    //     });
    // }

    // const fetchRunpodService = async (prompt: string, total: number, setData: (v: any) => void, type: string, callback: any) => {
    //     const skeletons = [{ height: 1, minHeight: '150px', isLoading: true }, { height: 2, minHeight: '150px', isLoading: true }, { height: 3, minHeight: '150px', isLoading: true }, { height: 4, minHeight: '150px', isLoading: true }];
    //     if (total === 1) {
    //         setData(skeletons);
    //     }
    //     if (total === 4) {
    //         setData((prevState: any) => {
    //             return Array.isArray(prevState) ? [...prevState, ...skeletons] : skeletons;
    //         });
    //     }
    //     RunPodDiffusionService(prompt, false, false, total, type).then(convertResSD => {
    //         setData((previousState: any) => {
    //             convertResSD = wrapOnClickEventForData(convertResSD, '150px', '');
    //             let newResult: any = [];
    //             if (previousState === null) return convertResSD;
    //             if (total === 1) {
    //                 newResult = [...previousState];
    //                 if (convertResSD && convertResSD.length > 0 && isObject(convertResSD[0])) {
    //                     newResult[0] = convertResSD[0];
    //                 }
                    
    //             } else if (total === 3) {
    //                 newResult = [...previousState];
    //                 for (let i = 0; i < convertResSD.length; i++) {
    //                     newResult[i + 1] = convertResSD[i];
    //                 }
    //             } else {
    //                 newResult = [...previousState];
    //                 if (convertResSD[3]) {
    //                     newResult[newResult.length - 1] = convertResSD[3];
    //                 }
    //                 if (convertResSD[2]) {
    //                     newResult[newResult.length - 2] = convertResSD[2];
    //                 }
    //                 if (convertResSD[1]) {
    //                     newResult[newResult.length - 3] = convertResSD[1];
    //                 }
    //                 if (convertResSD[0]) {
    //                     newResult[newResult.length - 4] = convertResSD[0];
    //                 }
    //             }
    //             return newResult;
    //         });
    //     }).catch((error) => {
    //         console.log(error)
    //     }).finally(() => {
    //         if (callback) {
    //             callback();
    //         }
    //     });
    // }

    const handleSearchParallel = async (param: FilterParams, isActionSubmit: boolean) => {
        // if (!value) {
        //     setIsSubmit(false);
        //     setDisplayLexicaImages([]);
        //     await fetchTrend({ page: 0 });

        //     return;
        // }
        setIsLoadingSuggestion(true);
        setIsLoadingTrend(true);
        setDisplayLexicaImages([]);
        let result_lexica: any = await LexicaSearchService(param);
        if (result_lexica.data) {
            setSuggestions(result_lexica.keywordSuggestions);
            // setIsRelevant(result_lexica.isRelevant);
            setIsRelevant(false);
            setFilters(result_lexica.filters);
            result_lexica = wrapOnClickEventForData(result_lexica.data, '', 'lexica');
            setIsLoadingSuggestion(false);

            if (result_lexica?.length) {
                if (result_lexica?.length > 0) {
    
                    if (!isActionSubmit) {
                        setDisplayTrendingImages(result_lexica);
                        if (isSearch && isCreate) {
                            setDisplayLexicaImages(result_lexica);
                        }
                    } else {
                        setDisplayLexicaImages(result_lexica);
                    }
                    
                    
                }
                setSuggestStyles(StyleSuggestion(result_lexica, 10, true));
    
            } else {
                if (isActionSubmit) {
                    fetchTrend();
                } else {
                    setDisplayTrendingImages([]);
                }
                
                setDisplayLexicaImages([]);
            }
        }
        
        if (isActionSubmit) {
            setIsLiveSearch(false);
            setIsCreate(true);
            setIsSearch(true);
            setIsSubmit(true);
            // slowInferenceV2(param.keyword ? param.keyword : prompt);
        }

        setIsLoadingTrend(false);
        
    }

    const fetchTracker = (type: Tracker, filtersP?: FilterParams) => {
        const params: FilterTrackerParams = {
            user_id: 1,
            results_id: -1,
            action: type,
            prompt: filtersP?.keyword,
            filters: filtersP?.filters
        }
        TrackerService(params)
    }

    const handlePromptChange = (value: any) => {
        if (value) {
            logEvent(analytics, 'search')
            const _filterParams = {
                ...filterParams,
                keyword: value ? value : '',
                page: 0,
            }
            setFilterParams(_filterParams);
            fetchTracker(Tracker.SEARCH, _filterParams);
            // handleSearchParallel(_filterParams, false);
            onFilterToQueryString(_filterParams);
        }
        
        setPrompt(value);
    }

    const onFilterToQueryString = (values: FilterParams) => {
        navigate(
          {
            pathname: location.pathname,
            search: `?${querystring.stringify(
              {
                page: values.page,
                keyword: values.keyword,
                limit: values.limit,
                user_id: values.user_id,
                model: values.filters?.model,
                orientation: values.filters?.orientation,
                resolution: values.filters?.resolution,
              },
              { arrayFormat: 'bracket', skipNull: true, skipEmptyString: true }
            )}`,
          },
          { replace: true }
        );
    };

    const handleToggleMobileMenu = (toggle: boolean) => {
        setToggleMobileMenu(toggle);
    };

    const handleClickOutsiteSearchInput = () => {
        
    }

    const handleClickSuggetionsKeywordsV1 = (keyword: string) => {
        if (!keyword) {
            setFilterParams({
                ...filterParams,
                keyword: ''
            })
        }
        onFilterToQueryString({
            ...filterParams,
            keyword: ''
        })
        requestSuggestions(keyword)
    }

    const closeDropdownSuggestion = () => {
        // setSuggs([]);
    }

    const handleShowFilter = () => {
        if (isMobile) {
            setOpenSidebar(true);
        } else {
            setShowSidebar(!showSidebar);  
        }
        
        
    }

    const handleFilter = (checkedFilter: boolean, field: string, value: string) => {
        setChecked({
            ...checked,
            [field]: checkedFilter ? value : '',
        });
        const _filterParams = {
            ...filterParams,
            page: 0,
            filters: {
                ...filterParams?.filters,
                [field]: checkedFilter ? value : '',
            }
        }
        setFilterParams(_filterParams);
        fetchTracker(Tracker.SEARCH, _filterParams);
        if (!isMobile) {
            handleSearchParallel(_filterParams, false);
        }
    };

    useEffect(() => {
        function cb() {
            const sCont: HTMLDivElement | null = document.querySelector('.storys-container');
            const hScroll: HTMLDivElement | null = document.querySelector('.horizontal-scroll');
            const btnRight: HTMLElement | null = document.getElementById('right_btn');
            const btnRightWapper: HTMLElement | null = document.getElementById('right-button');
            
           
            
            if (sCont && hScroll && btnRight && btnRightWapper) {
                const maxScroll = -sCont.offsetWidth + hScroll.offsetWidth;
                // console.log(sCont.offsetWidth, 'sCont')
                // console.log(hScroll.offsetWidth, 'hScroll')
                // console.log(maxScroll, 'maxScroll')
                // console.log(showSidebar, 'showSidebar')
                // console.log(currentScrollPosition.current, 'currentScrollPosition.current')

                if (currentScrollPosition.current < maxScroll) {
                    if (sCont.offsetWidth <= hScroll.offsetWidth) {
                        btnRightWapper.style.display = 'none';
                    } else {
                        btnRightWapper.style.display = 'flex';
                    }
                    
                } else {
                    btnRightWapper.style.display = 'flex';
                }
            }
        }
        window.addEventListener('resize', cb);
        cb();
        return () => {
          window.removeEventListener('resize', cb);
        };
    });

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
                btnLeftWapper.style.display = 'none';
            } else {
                btnLeftWapper.style.display = 'flex';
            }

            if (currentScrollPosition.current < maxScroll) {
                currentScrollPosition.current = maxScroll;
                btnRightWapper.style.display = 'none';
            } else {
                btnRightWapper.style.display = 'flex';
            }
            sCont.style.left = currentScrollPosition.current + 'px';
        }
    };

    function InlineWrapperWithMargin({ children }: PropsWithChildren<unknown>) {
        return <span style={{ marginRight: '0.5rem' }}>{children}</span>
    }

    const fetchTrandLoadMore = async (params: TrendingRequest) => {
        // setIsLoadingTrend(true);
        // setDisplayTrendingImages([]);
        setFilterParams({
            ...filterParams,
            page: params.page + 1,
        })
        if (filterParams.keyword) {
            fetchSearchLoadMore({page: params.page + 1})
        } else {
            let res = await TrendingService({ page: params.page + 1});
            res.data = wrapOnClickEventForData(res.data, '100px', 'openart');
            if (!isLexicaResponse(res)) {
                if (res?.data.length) {
                    setDisplayTrendingImages([...displayTrendImages, ...res.data]);
                    setSuggestions(res.keywordSuggestions);
                    // setIsLoadingTrend(false);
                }
                setSuggestStyles(StyleSuggestion(res?.data as any, 10, false));
            }
        }
        
    }

    const fetchSearchLoadMore = async (params: TrendingRequest) => {
        const _filterParams = {
            ...filterParams,
            page: params.page + 1,
        }
        setFilterParams(_filterParams)
        
        let result_lexica: any = await LexicaSearchService(_filterParams);
        
        if (result_lexica.data) {
            result_lexica = wrapOnClickEventForData(result_lexica.data, '', 'lexica');
            console.log(result_lexica, 'result_lexica')
            if (result_lexica?.length) {
                if (!isCreate && !isSearch) {
                    setDisplayTrendingImages([...displayTrendImages, ...result_lexica]);
                } else {
                    setDisplayLexicaImages([...displayLexicaImages, ...result_lexica]);
                }
                
    
            }
        }
    }

    // const handleViewMoreMJv4 = () => {
    //     setIsViewMoreJv4(true);
    //     fetchRunpodService(prompt, 4, setDisplayMJv4Images,  ProductionModelList.MIDJOURNEY_v4, () => {
    //         setIsViewMoreJv4(false);
    //     });
    // };

    // const handleViewMoreSDv21 = () => {
    //     setIsViewMoreSDv21(true);
    //     fetchRunpodService(prompt, 4, setDisplaySDv21Images, ProductionModelList.STABLE_DIFFUSION_v21, () => {
    //         setIsViewMoreSDv21(false);
    //     });
    // };

    // const handleViewMoreSDv15 = () => {
    //     setIsViewMoreSDv15(true);
    //     fetchRunpodService(prompt, 4, setDisplaySDv15Images, ProductionModelList.STABLE_DIFFUSION_v15, () => {
    //         setIsViewMoreSDv15(false);
    //     });
    // };

    // const handleViewMoreWaifuSD = () => {
    //     setIsViewMoreWaifuSD(true);
    //     fetchRunpodService(prompt, 4, setDisplayWaifuSDImages, ProductionModelList.WAIFU_DIFFUSION, () => {
    //         setIsViewMoreWaifuSD(false);
    //     });
    // };

    const checkSuggsKeywords = (keywords: string) => {
        if ( suggsKeywords === encodeURIComponent(keywords.toLowerCase())) {
            return true;
        }
        return false;
    }

    const requestSuggestions = async (keywords: string) => {
        // current suggs was request with the input keywords
        // no need to send again
        if (checkSuggsKeywords(keywords)) {
            return;
        }
    
        // empty keywords just reset the suggsKeywords and suggs
        if (keywords.length === 0) {
            // this.setState({suggsKeywords:"", suggs:[]});
            // setSuggsKeywords('');
            setSuggs([]);
            return;
        }
    
        const urlKeywords = encodeURIComponent(keywords.toLowerCase());
        setSuggsKeywords(urlKeywords);
        setSuggs([]);
        
        const url = 'https://suggestqueries.google.com/complete/search?output=chrome&q='+urlKeywords;

        fetchJsonp(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            if (json[1].length > 0) {
                setSuggs(json[1]);
            }
            
        }).catch(function(ex) {})
    }

    const handleClickSuggestion = (value: any) => {
        const _filterParams = {
            ...filterParams,
            keyword: filterParams.keyword + ' ' + `${typeof value === 'string' ? value : value.facet}`,
            page: 0,
        }
        setFilterParams(_filterParams);
        onFilterToQueryString(_filterParams)
        // handleSearchParallel(_filterParams, false);
    }

    const handleFilterMobile = (valueFilter: FilterParams) => {
        handleSearchParallel(valueFilter, false);
    }

    const handleClearAllFilter = (valueFilter: FilterParams) => {
        setChecked({
            model: '',
            orientation: '',
            resolution: '',
        });
        const _filterParams = {
            ...valueFilter,
            filters: {
                model: '',
                orientation: '',
                resolution: ''
            }
        }
        setFilterParams(_filterParams);
    }

    const RenderFilter = () => {
        return (
            <div>
                {filterParams.keyword && (
                    <div className="mx-6 bg-white">
                    
                    
                        <div className={`flex text-[#503981] filter-button cursor-pointer p-2 rounded-xl flex-col`} >
                                
                            {filters && filters?.model?.length > 0 && (
                                <FilterHomePage
                                    title="Model"
                                    valueChecked={checked.model}
                                    filters={filters.model}
                                    field={Filter.MODEL}
                                    handleFilter={handleFilter}
                                />
                            )}

                            {filters && filters?.orientation?.length > 0 && (
                                <FilterHomePage
                                    title="Orientation"
                                    valueChecked={checked.orientation}
                                    filters={filters.orientation}
                                    field={Filter.ORIENTATION}
                                    handleFilter={handleFilter}
                                />
                            )}

                            {filters && filters?.resolution?.length > 0 && (
                                <FilterHomePage
                                    title="Resolution"
                                    valueChecked={checked.resolution}
                                    filters={filters.resolution}
                                    field={Filter.RESOLUTION}
                                    handleFilter={handleFilter}
                                />
                            )}


                            
                        </div>

                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={`${isOpenModal ? 'hidden sm:block' : 'w-full}'}`}>
             <Sidebar 
                handleFilterMobile={handleFilterMobile}
                handleClearAllFilter={handleClearAllFilter}
                filter={filterParams}
                open={openSidebar}
                setOpen={setOpenSidebar}
                subChild={<RenderFilter />}
                children={
                    <div className={`${openSidebar ? 'hidden' : 'block'} duration-[2000]`}>
                        <HeaderHomePage 
                            isClickInput={isClickInput}
                            handleClearInput={handleClearInput} 
                            handleClickInput={handleClickInput} 
                            handleSearchParallel={handleSearchParallel} 
                            handlePromptChange={handlePromptChange} 
                            filterParams={filterParams} 
                            handleClickOutsiteSearchInput={handleClickOutsiteSearchInput}
                            suggs={suggs}
                            handleClickSuggetionsKeywordsV1={handleClickSuggetionsKeywordsV1}
                            closeDropdownSuggestion={closeDropdownSuggestion}
                            toggleMobileMenu={toggleMobileMenu}
                            handleToggleMobileMenu={handleToggleMobileMenu}
                        />

                        <SendEmail
                            isSubmit={isSubmit}
                            data={displayLexicaImages}
                            isRelevant={isRelevant}
                            filterParams={filterParams}
                        />

                        <div className={`mx-4 sm:mx-16`}>
                            <div className="flex mt-4">
                                {((!isSubmit && displayTrendImages.length > 0) || (isSubmit && displayLexicaImages.length > 0)) && filterParams.keyword && (
                                    <div className={`flex justify-start flex-row items-center mr-5 ${showSidebar ? 'w-[25%] duration-700' : `${!isMobile ? 'w-[120px]' : 'w-[80px]'} duration-700`}`} onClick={handleShowFilter}>        
                                        <div className={`w-full bg-violet-3 py-4 sm:py-3 px-5 sm:px-5 text-[#503981] flex justify-between rounded-xl filter-button cursor-pointer`} >
                                            <div className="flex">
                                                <img alt="filter" src={FilterIcon} style={{ width: '15px' }}/>
                                                {!isMobile && <span className="ml-2">Filter</span>}
                                            </div>
                                            {showSidebar && <div className="hidden sm:flex items-center">
                                                <img alt="hide-filter" src={HideFilter} style={{ width: '15px' }}/>
                                            </div>}
                                        </div>
                                    </div>
                                )}
                                {isLoadingSuggestion ? (
                                    <div className="w-full"> 
                                        <LoadingSkeleton
                                            count={5}
                                            wrapper={InlineWrapperWithMargin}
                                            inline
                                            width={'15%'}
                                            height={48}
                                            borderRadius={12}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-[calc(100vw-25px)] h-[50px]"> 
                                        <div className="w-full h-full relative overflow-x-hidden horizontal-scroll flex flex-row justify-between items-center">
                                            <div className="flex justify-start flex-row items-center absolute left-0 transition delay-150 storys-container">
                                                {suggestions.length > 0 && suggestions.map((suggestion: any, index: number) => (
                                                    <div key={index} className={`${index === 0 ? 'ml-0' : ''} mx-2 px-4 flex items-center cursor-pointer w-max py-3 rounded-xl border-[1px] border-[#CECDD6]`} onClick={() => handleClickSuggestion(suggestion)}>
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
                                )}
                                
                            </div> 

                            <div className="flex mt-4">
                                {filterParams.keyword && (
                                    <div className={`hidden sm:flex justify-start flex-row ${showSidebar ? 'w-[25%] duration-700 mr-6' : 'w-0 duration-700'}`}>        
                                        <div className={`${showSidebar ? 'flex' : 'hidden'} bg-violet-3 py-3 text-[#503981] filter-button cursor-pointer p-2 rounded-xl flex flex-col w-full`} >
                                            
                                            {filters && filters?.model?.length > 0 && (
                                                <FilterHomePage
                                                    title="Model"
                                                    valueChecked={checked.model}
                                                    filters={filters.model}
                                                    field={Filter.MODEL}
                                                    handleFilter={handleFilter}
                                                />
                                            )}

                                            {filters && filters?.orientation?.length > 0 && (
                                                <FilterHomePage
                                                    title="Orientation"
                                                    valueChecked={checked.model}
                                                    filters={filters.orientation}
                                                    field={Filter.ORIENTATION}
                                                    handleFilter={handleFilter}
                                                />
                                            )}

                                            {filters && filters?.resolution?.length > 0 && (
                                                <FilterHomePage
                                                    title="Resolution"
                                                    valueChecked={checked.model}
                                                    filters={filters.resolution}
                                                    field={Filter.RESOLUTION}
                                                    handleFilter={handleFilter}
                                                />
                                            )}
                                            
                                        </div>
                                    </div>
                                )}
                                <div className="relative w-[calc(100vw-25px)]">
                                    {isCreate && isSearch ? (
                                        <div className="flex flex-col"> 
                                            {isSubmit && displayLexicaImages.length > 0 && (isRelevant !== null && isRelevant) ? (
                                                <div>
                                                    <Title>{`Search results for ${filterParams.keyword}`}</Title>
                                                    <TextCount>{displayLexicaImages?.length || 0} results</TextCount>
                                                    {displayLexicaImages.length === 0 ? (
                                                        <LoadingSkeleton
                                                            count={12}
                                                            wrapper={InlineWrapperWithMargin}
                                                            inline
                                                            width={'49%'}
                                                            height={200}
                                                        /> 
                                                    ) : (
                                                        <InfiniteScroll
                                                            dataLength={displayLexicaImages.length}
                                                            next={() => fetchSearchLoadMore({ page : filterParams.page || 0 })}
                                                            hasMore
                                                            loader={<div></div>}
                                                        >
                                                            {displayLexicaImages.length > 0 && (
                                                                <ReactMasonry 
                                                                    breakpointCols={{
                                                                        default: showSidebar ? 4 : 5,
                                                                        500: 1,
                                                                    }}
                                                                    data={displayLexicaImages}
                                                                />
                                                            )}
                                                            
                                                        </InfiniteScroll>
                                                        
                                                    )}
                                                </div>
                                            ) : ''}

                                            {/* {isSubmit && displayLexicaImages.length > 0 && (isRelevant !== null && !isRelevant) ? (
                                                <div>
                                                    <div className="flex px-16 justify-center"> 
                                                        {badges.map((badge: badgeType, index: number) => (
                                                            <div key={index} onClick={() => setSelectBadge(badge.type)} className={`${selectBadge === badge.type ? 'bg-neutral-100 text-white rounded-full border border-neutral-100' : 'text-neutral-100'} py-2 px-8 cursor-pointer`}>
                                                                {badge.name}
                                                            </div>
                                                        ))}
                                                    </div>    
                                                    {selectBadge === BadgeHomePage.ALL && (
                                                        <div className="flex flex-row mt-4">
                                                            <div className="w-[65%] mr-4">
                                                                <>
                                                                    <Title>
                                                                        Search results
                                                                    </Title>
                                                                    <TextCount>{displayLexicaImages?.length || 0} results</TextCount>
                                                                    {displayLexicaImages.length === 0 ? (
                                                                        <LoadingSkeleton
                                                                            count={12}
                                                                            wrapper={InlineWrapperWithMargin}
                                                                            inline
                                                                            width={'49%'}
                                                                            height={200}
                                                                        /> 
                                                                    ) : (
                                                                        <InfiniteScroll
                                                                            dataLength={displayLexicaImages.length}
                                                                            next={() => fetchSearchLoadMore({ page : filterParams.page || 0 })}
                                                                            hasMore
                                                                            loader={<div></div>}
                                                                        >
                                                                            {displayLexicaImages.length > 0 && (
                                                                                <ReactMasonry
                                                                                    breakpointCols={{ default: 4 }}
                                                                                    data={displayLexicaImages}
                                                                                />
                                                                            )}
                                                                            
                                                                        </InfiniteScroll>
                                                                        
                                                                    )}
                                                                </>
                                                            </div>
                                                            <RightSection>
                                                                <Title>
                                                                    Art made for you
                                                                </Title>

                                                                <MadeByMidjourney
                                                                    displayMJv4Images={displayMJv4Images}
                                                                    isViewMoreJv4={isViewMoreJv4}
                                                                    handleViewMoreMJv4={handleViewMoreMJv4}
                                                                />

                                                                <MadeByStableDiffusion
                                                                    displaySDImages={displaySDv21Images}
                                                                    handleViewMoreSD={handleViewMoreSDv21}
                                                                    isViewMoreSD={isViewMoreSDv21}
                                                                    title="Made by Stable Diffusion"
                                                                />

                                                                <MadeByStableDiffusion
                                                                    displaySDImages={displaySDv15Images}
                                                                    handleViewMoreSD={handleViewMoreSDv15}
                                                                    isViewMoreSD={isViewMoreSDv15}
                                                                    title="Made by Stable Diffusion"
                                                                />

                                                                <MadeByStableDiffusion
                                                                    displaySDImages={displayWaifuSDImages}
                                                                    handleViewMoreSD={handleViewMoreWaifuSD}
                                                                    isViewMoreSD={isViewMoreSDv2}
                                                                    title="Made by Waiffu Diffusion"
                                                                />
                                                            </RightSection>
                                                        </div>
                                                    )}

                                                    {selectBadge === BadgeHomePage.SEARCH_RESULTS && (
                                                        <div className="mt-6">
                                                             <InfiniteScroll
                                                                dataLength={displayLexicaImages.length}
                                                                next={() => fetchSearchLoadMore({ page : filterParams.page || 0 })}
                                                                hasMore
                                                                loader={<div></div>}
                                                            >
                                                                {displayLexicaImages.length > 0 && (
                                                                    <ReactMasonry
                                                                        breakpointCols={{ default: 4 }}
                                                                        data={displayLexicaImages}
                                                                    />
                                                                )}
                                                                
                                                            </InfiniteScroll>
                                                            
                                                        </div>
                                                    )}

                                                    {selectBadge === BadgeHomePage.ART_MADE_FOR_YOU && (
                                                        <div>
                                                            <Title>
                                                                Art made for you
                                                            </Title>

                                                            <MadeByMidjourney
                                                                displayMJv4Images={displayMJv4Images}
                                                                isViewMoreJv4={isViewMoreJv4}
                                                                handleViewMoreMJv4={handleViewMoreMJv4}
                                                            />

                                                            <MadeByStableDiffusion
                                                                displaySDImages={displaySDv21Images}
                                                                handleViewMoreSD={handleViewMoreSDv21}
                                                                isViewMoreSD={isViewMoreSDv21}
                                                                title="Made by Stable Diffusion v2.1"
                                                            />

                                                            <MadeByStableDiffusion
                                                                displaySDImages={displaySDv15Images}
                                                                handleViewMoreSD={handleViewMoreSDv15}
                                                                isViewMoreSD={isViewMoreSDv15}
                                                                title="Made by Stable Diffusion v1.5"
                                                            />

                                                            <MadeByStableDiffusion
                                                                displaySDImages={displayWaifuSDImages}
                                                                handleViewMoreSD={handleViewMoreWaifuSD}
                                                                isViewMoreSD={isViewMoreSDv2}
                                                                title="Made by waifu Diffusion"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : ''} */}

                                            {displayLexicaImages.length === 0 ? (
                                                <InfiniteScroll
                                                    dataLength={displayTrendImages.length}
                                                    next={() => fetchTrandLoadMore({ page : filterParams.page || 0 })}
                                                    hasMore
                                                    loader={<div></div>}
                                                >
                                                    {displayTrendImages.length > 0 && (
                                                        <ReactMasonry 
                                                            breakpointCols={{
                                                                default: 5,
                                                                500: 1,
                                                            }}
                                                            data={displayTrendImages}
                                                        />
                                                    )}
                                                    
                                                </InfiniteScroll>
                                            ) : ''}
                                        </div>
                                    ) : (
                                        isLoadingTrend ? (
                                            <LoadingSkeleton
                                                count={12}
                                                wrapper={InlineWrapperWithMargin}
                                                inline
                                                width={isMobile ? '100%' : '24%'}
                                                height={200}
                                                borderRadius={12}
                                            />
                                        ) : (
                                            displayTrendImages.length > 0 ? (
                                                <InfiniteScroll
                                                    dataLength={displayTrendImages.length}
                                                    next={() => fetchTrandLoadMore({ page : filterParams.page || 0 })}
                                                    hasMore
                                                    loader={<div></div>}
                                                >
                                                    {displayTrendImages.length > 0 && (
                                                        <ReactMasonry 
                                                            breakpointCols={{
                                                                default: showSidebar ? 4 : 5,
                                                                500: 2,
                                                            }}
                                                            data={displayTrendImages}
                                                        />
                                                    )}
                                                    
                                                </InfiniteScroll>
                                            ) : (
                                                <div className="font-semibold text-2xl leading-8 text-neutral-100">No results found</div>
                                            )
                                            
                                        )             
                                    )}
                                </div>
                            </div> 
                        </div>
                    </div>
                }
            />
            
        </div>
    )
};

export default HomePage;