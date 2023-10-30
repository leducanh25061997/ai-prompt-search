import React, { useCallback, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@components/Icons/ClearIcon';

import {
  Wrapper,
  Input,
  Textarea,
  SearchBtn,
  ClearBtn,
} from './index.styled';

import SearchIcon from '@components/Icons/SearchIcon';
import useClickOutside from '@hooks/useclickOutside';
import { useDebounce } from '@/hooks/useDebounce';
import useKeyPress from '@/hooks/useKeyPress';
import TrendingSearchesIcon from '../Icons/TrendingSearchesIcon';
import useScrollListener from '@/hooks/useScrollListener';

type SearchBarProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  isDynamicHeight: PropTypes.bool.isRequired,
  value: PropTypes.shape({
    user_id: PropTypes.number,
    keyword: PropTypes.string,
    limit: PropTypes.number,
    page: PropTypes.number,
    filters: PropTypes.shape({
      model: PropTypes.string,
      orientation: PropTypes.string,
      resolution: PropTypes.string
    })
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickInput: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  hiddenToggle: PropTypes.bool.isRequired,
  handleClickOutsiteSearchInput: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired,
  handleSuggetionsKeywords: PropTypes.func,
  closeDropdownSuggestion: PropTypes.func,
  bgSearchBar: PropTypes.string,
};

const SearchBar = ({
  value,
  onSubmit,
  onChange,
  onClear,
  onClickInput,
  isDynamicHeight,
  handleClickOutsiteSearchInput,
  suggestions,
  handleSuggetionsKeywords,
  closeDropdownSuggestion,
  bgSearchBar = 'transparent',
}: SearchBarProps) => {
  const refInput = useRef(null);
  const refWrapper = useRef(null);
  const refBtn = useRef(null);
  const [isOutside, setIsOutside] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const refWrapperSuggestion = useRef(null);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
  const watchDebouncedValue = useDebounce(valueInput, 500);
  const [isClick, setIsclick] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(0);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const scroll = useScrollListener();

  useEffect(() => {
    setValueInput(value?.keyword || '')
  }, [value])

  useEffect(() => {
    if (suggestions.length && downPress) {
      setCursor((prevState) =>
        prevState < suggestions.length - 1 ? prevState + 1 : prevState
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (suggestions.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (suggestions.length && hovered) {
      setCursor(hovered);
    }
  }, [hovered]);
  
  useEffect(() => {
    if (watchDebouncedValue) {
      onChange(watchDebouncedValue);
    }
  }, [watchDebouncedValue]);

  useEffect(() => {
    if (scroll.y >= 200) {
      setShowSuggestion(false);
      setIsclick(false)
    }
}, [scroll.y]);

  const handleInputChange = (event: any) => {
    setIsclick(false);
    if (event.key !== "Enter") {
      setShowSuggestion(true);
      handleSuggetionsKeywords && handleSuggetionsKeywords(event.target.value);
      setValueInput(event.target.value || '');
    }
  }

  const handleClickOutsideInput = () => {
    setIsOutside(true);
    handleClickOutsiteSearchInput();
    setShowSuggestion(false);
    setIsclick(false);
  }

  useClickOutside(refInput, handleClickOutsideInput);

  const handleClickOutsieDropdownSuggestion = () => {
    setShowSuggestion(false);
    closeDropdownSuggestion && closeDropdownSuggestion();
    setIsclick(false);
  }

  useClickOutside(refInput, handleClickOutsieDropdownSuggestion);
  

  useEffect(() => {
    if (isDynamicHeight) {
      if (isOutside) {
        (refInput.current as any).style.height = '40px';
        (refWrapper.current as any).style.paddingTop = '';
        (refInput.current as any).scrollTop = 0;
        (refBtn.current as any).style.height = '';
        (refBtn.current as any).style.left = '';
        (refBtn.current as any).style.position = '';
        return;
      }
      (refInput.current as any).focus();
      (refInput.current as any).style.height = '0px';
      const scrollHeight = (refInput.current as any).scrollHeight;
      const paddingTop = (refInput.current as any).style.paddingTop;
      const paddingBottom = (refInput.current as any).style.paddingBottom;
      const totalHeight = scrollHeight - parseInt(paddingTop || 0) - parseInt(paddingBottom || 0);
      if (totalHeight > 64) {
        (refBtn.current as any).style.position = 'relative';
        (refBtn.current as any).style.top = '18px';
        (refBtn.current as any).style.left = '-21px';
      } else {
        (refBtn.current as any).style.height = '';
        (refBtn.current as any).style.left = '';
        (refBtn.current as any).style.position = '';
      }
      if (totalHeight > 112) {
        (refInput.current as any).style.height = '112px';
        (refWrapper.current as any).style.paddingTop = '1rem';
        (refInput.current as any).scrollTop = (refInput.current as any).scrollHeight;
      } else {
        (refInput.current as any).style.height = totalHeight + 'px';
        (refWrapper.current as any).style.paddingTop = '';
      }
    }
  }, [value, isOutside, isDynamicHeight]);

  const handleSubmit = () => {
    handleClickOutsiteSearchInput();
    handleClickOutsieDropdownSuggestion();
    onSubmit(value, false);
  };

  const handleClear = () => {
    closeDropdownSuggestion && closeDropdownSuggestion();
    setValueInput('');
    onClear();
  };

  const handleSelectSuggest = (value: string) => {
    setValueInput(value);
    onChange(value);
  }

  return (
    <div className="relative w-full">
      <Wrapper ref={refWrapper} className={`${isClick ? 'bg-white border-[1px] border-[#95A2F1' : 'bg-violet-3'} duration-200 hover:border-[#95A2F1] hover:border-[1px] sm:w-[638px]`}>
        {isDynamicHeight ? (
          <Textarea
            autoComplete="off"
            ref={refInput}
            value={valueInput || value.keyword || ''}
            placeholder="Search"
            onChange={(e: any) => handleInputChange(e)}
            onKeyDown={(event: any) => {
              if (event.key === "Enter" && value !== "") { 
                event.preventDefault(); 
                handleSubmit(); 
              } 
            }}
            ro
            onClick={() => { onClickInput(); setIsOutside(false); setShowSuggestion(true); setIsclick(true) }}
          />
        ) : (
          <Input
            className={`focus:bg-transparent`}
            autoComplete="off"
            ref={refInput}
            value={valueInput || value.keyword || ''}
            placeholder="Search"
            onChange={(e: any) => handleInputChange(e)}
            onKeyDown={(event: any) => {
              if (event.key === "Enter" && value !== "") { handleSubmit() }
            }}
            onClick={() => { onClickInput(); setShowSuggestion(true); setIsclick(true) }}
          />
        )}
        <div ref={refBtn} className="px-2 flex items-center">
          {(valueInput || value.keyword) && <ClearBtn onClick={handleClear}>
            <ClearIcon />
          </ClearBtn>}
          <SearchBtn onClick={handleSubmit}>
            <SearchIcon />
          </SearchBtn>
        </div>
      </Wrapper>
      {showSuggestion && suggestions.length > 0 && (
        <div className="absolute mt-3 py-2 w-full bg-[white] shadow-[4px_8px_40px_rgba(0,0,0,0.12)] rounded-xl" ref={refWrapperSuggestion} >
          {suggestions.map((suggestion: string, index: number) => (
            <div 
              className={`p-3 ${index === cursor ? 'bg-neutral-5' : ''}`} 
              key={suggestion} 
              onClick={() => handleSelectSuggest(suggestion)}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(undefined)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      {showSuggestion && suggestions.length === 0 && isClick && (
        <div className="absolute mt-3 w-full bg-[white] shadow-[4px_8px_40px_rgba(0,0,0,0.12)] rounded-xl p-[20px]" ref={refWrapperSuggestion} >
            <div>
                <p className="text-neutral-100 #0C0534 font-medium">Recent searches</p>
                <div className="flex mt-[10px]">
                  <div className="flex items-center bg-neutral-5 rounded-lg px-4 py-2">
                    <SearchIcon color="#3D375D" width="13" height="13" />
                    <p className="ml-2">Keyword</p>
                  </div>
                  <div className="flex items-center bg-neutral-5 rounded-lg px-4 py-2 ml-5">
                    <SearchIcon color="#3D375D" width="13" height="13" />
                    <p className="ml-2">Keyword</p>
                  </div>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-neutral-100 #0C0534 font-medium">Trending searches</p>
                <div className="flex mt-[10px]">
                  <div className="flex items-center bg-neutral-5 rounded-lg px-4 py-2">
                    <TrendingSearchesIcon color="#3D375D" />
                    <p className="ml-2">Keyword</p>
                  </div>
                  <div className="flex items-center bg-neutral-5 rounded-lg px-4 py-2 ml-5">
                    <TrendingSearchesIcon color="#3D375D" />
                    <p className="ml-2">Keyword</p>
                  </div>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-neutral-100 #0C0534 font-medium">Trending styles</p>
                <div className="flex mt-[10px]">
                  <div className="flex items-center bg-neutral-5 rounded-lg px-4 py-2">
                    <div className="bg-violet-3 w-11 h-11 rounded-full"></div>
                    <p className="ml-2">Oil painting</p>
                  </div>
                </div>
            </div>
        </div>
      )}
    </div>

  );
};

SearchBar.propTypes = propTypes;

SearchBar.defaultProps = {
  onSubmit: () => { },
  onchange: () => { },
  onClickInput: () => { },
  onClear: () => { },
  value: {},
  isDynamicHeight: false,
  handleClickOutsiteSearchInput: () => { },
  suggestions: [],
  handleSuggetionsKeywords: () => {},
  closeDropdownSuggestion: () => {},
}

export default SearchBar;
