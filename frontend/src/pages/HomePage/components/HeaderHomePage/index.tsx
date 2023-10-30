import useSticky from "@/hooks/useSticky";
import React, { useEffect, useRef, useState } from "react";
import { Actions, Nav, SearchWrapper } from "../../index.styled";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { FilterParams } from "@/types/Filter";

import Instagram from "@assets/Instagram.svg";
import Logo from "@assets/Logo.svg";
import Twitter from "@assets/Twitter.svg";
import HamburgerBtn from "@/components/HamburgerBtn";
import MobileMenu from "@/components/MobileMenu";
import InstagramIcon from "@/components/Icons/InstagramIcon";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import useScrollListener from "@/hooks/useScrollListener";
import LogoIcon from "@/components/Icons/LogoIcon";

interface Props {
  isClickInput: boolean;
  handleClearInput: () => void;
  handleClickInput: () => void;
  handleSearchParallel: (param: FilterParams, isActionSubmit: boolean) => void;
  handlePromptChange: (value: string) => void;
  filterParams: FilterParams;
  handleClickOutsiteSearchInput: () => void;
  suggs: string[];
  handleClickSuggetionsKeywordsV1: (value: string) => void;
  closeDropdownSuggestion: () => void;
  toggleMobileMenu: boolean;
  handleToggleMobileMenu: (value: boolean) => void;
}

const HeaderHomePage = (props: Props) => {
  const {
    handleClearInput,
    handleClickInput,
    isClickInput,
    handleSearchParallel,
    handlePromptChange,
    filterParams,
    handleClickOutsiteSearchInput,
    suggs,
    handleClickSuggetionsKeywordsV1,
    closeDropdownSuggestion,
    toggleMobileMenu,
    handleToggleMobileMenu,
  } = props;
  const { sticky, stickyRef } = useSticky();
  const scroll = useScrollListener();
  const conditionDisplaySuggestion = !sticky || (sticky && isClickInput);
  const [navClassList, setNavClassList] = useState<string>();
  const [navScrollClassList, setNavScrollClassList] = useState<string>(
    "translate-y-[-100%]"
  );

  useEffect(() => {
    if (scroll.y >= 200) {
      setNavClassList("translate-y-[-100%]");
      setNavScrollClassList("translate-y-[0]");
    } else {
      setNavClassList("translate-y-[0]");
      setNavScrollClassList("translate-y-[-100%] opacity-0");
    }
  }, [scroll.y, scroll.lastY]);

  return (
    <Nav
      ref={stickyRef}
      className={`flex flex-col z-10 border-b sm:border-b-0`}
    >
      <div
        className={`w-full flex flex-col sm:flex-row sm:justify-between px-4 sm:px-16 py-5 bg-[url('@assets/background-header.svg')] h-[400px]`}
      >
        <Link to="/" className="logo sticky-default flex justify-between">
          <div className="flex">
            <div
              className="flex"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <div>
                <LogoIcon color="#FFFFFF" />
              </div>
              <div className="hidden sm:block ml-4 text-white">
                <p className="font-semibold text-xl">Galerie</p>
                <p className="font-normal text-xs">AI Images search</p>
              </div>
            </div>
          </div>
          <div className="block sm:hidden">
            <HamburgerBtn
              stickyDefault
              toggle={toggleMobileMenu}
              onToggle={handleToggleMobileMenu}
            />
            {toggleMobileMenu && <MobileMenu />}
          </div>
        </Link>
        <div
          className={`flex flex-col justify-center items-center mt-[38px] sm:mt-0 ${navClassList} transition duration-700 ease-in-out`}
        >
          <p className="font-semibold text-3xl text-white mb-4 px-[55px] sm:px-0 text-center">
            AI Images for Valentine's Day
          </p>
          <SearchBar
            // isDynamicHeight
            bgSearchBar={"#F4EEF6"}
            hiddenToggle={!conditionDisplaySuggestion}
            onClear={handleClearInput}
            onClickInput={handleClickInput}
            onSubmit={handleSearchParallel}
            onChange={handlePromptChange}
            value={filterParams}
            handleClickOutsiteSearchInput={handleClickOutsiteSearchInput}
            suggestions={suggs}
            handleSuggetionsKeywords={handleClickSuggetionsKeywordsV1}
            closeDropdownSuggestion={closeDropdownSuggestion}
          />
        </div>
        <div className="sm:flex hidden gap-4 text-white">
          <NavLink
            to="/faq"
            className={({ isActive }: any) => (isActive ? "active" : undefined)}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }: any) => (isActive ? "active" : undefined)}
          >
            <InstagramIcon color={"#FFFFFF"} />
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }: any) => (isActive ? "active" : undefined)}
          >
            <TwitterIcon color={"#FFFFFF"} />
          </NavLink>
        </div>
      </div>

      <div
        className={`w-full flex flex-row justify-between fixed bg-white ${navScrollClassList} transition duration-700 ease-in-out p-4 sm:p-0 sm:px-16 sm:py-[14px]`}
      >
        <div
          className="flex"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img alt="Logo" src={Logo} />
          <div className="hidden sm:block ml-4">
            <p className="font-semibold text-xl">Galerie</p>
            <p className="font-normal text-xs">AI image search</p>
          </div>
        </div>
        <div className="flex items-center mx-[12px] sm:mx-0">
          <SearchBar
            // isDynamicHeight
            hiddenToggle={!conditionDisplaySuggestion}
            onClear={handleClearInput}
            onClickInput={handleClickInput}
            onSubmit={handleSearchParallel}
            onChange={handlePromptChange}
            value={filterParams}
            handleClickOutsiteSearchInput={handleClickOutsiteSearchInput}
            suggestions={suggs}
            handleSuggetionsKeywords={handleClickSuggetionsKeywordsV1}
            closeDropdownSuggestion={closeDropdownSuggestion}
          />
        </div>
        <Actions>
          <NavLink
            to="/faq"
            className={({ isActive }: any) => (isActive ? "active" : undefined)}
          >
            <p className="text-neutral-100 font-medium">FAQ</p>
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }: any) => (isActive ? "active" : undefined)}
          >
            <img alt="Instagram" src={Instagram} />
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }: any) => (isActive ? "active" : undefined)}
          >
            <img alt="Twitter" src={Twitter} />
          </NavLink>
        </Actions>
        <HamburgerBtn
          stickyDefault
          toggle={toggleMobileMenu}
          onToggle={handleToggleMobileMenu}
          color="#000000"
        />
        {toggleMobileMenu && <MobileMenu />}
      </div>
    </Nav>
  );
};

export default HeaderHomePage;
