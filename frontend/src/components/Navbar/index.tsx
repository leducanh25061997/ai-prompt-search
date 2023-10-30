import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  Nav,
  Actions,
  CustomNavLink,
  SignInBtn,
  SignInUp,
  // SignInBtn,
  // SocialBtn,
  // RatingBtn,
} from "./index.styled";

import { MAX_Z_INDEX } from "@config/const";

import Logo from "@assets/Logo.svg";
import Instagram from "@assets/Instagram.svg";
import Twitter from "@assets/Twitter.svg";

import HamburgerBtn from "@components/HamburgerBtn";
import MobileMenu from "@components/MobileMenu";
// import InstagramIcon from '@components/Icons/InstagramIcon';
// import TwitterIcon from '@components/Icons/TwitterIcon';

import useSticky from "@hooks/useSticky";
import { AppContext } from "@context/AppContext";
import useDeviceDetect from "@/hooks/useDeviceDetect";

type NavbarProps = PropTypes.InferProps<typeof propTypes>;

const propTypes = {
  defaultSticky: PropTypes.bool.isRequired,
};

const Navbar = ({ defaultSticky }: NavbarProps) => {
  const { isOpenModal } = useContext(AppContext);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const { stickyRef } = useSticky();

  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (stickyRef?.current?.style) {
      stickyRef.current.style.zIndex = isOpenModal ? 0 : MAX_Z_INDEX;
    }
  }, [isOpenModal, stickyRef]);

  const handleToggleMobileMenu = (toggle: boolean) => {
    setToggleMobileMenu(toggle);
  };

  if (defaultSticky) {
    return (
      <Nav ref={stickyRef} className={`sticky-default flex flex-col z-10`}>
        <div className="w-full flex flex-row justify-between ">
          <Link to="/" className="logo sticky-default lg:w-3/4">
            <div className="flex">
              <div className="flex">
                <div
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <img alt="Logo" src={Logo} />
                </div>
                <div className="ml-5">
                  <p className="font-semibold text-xl">Galerie.ai</p>
                  <p className="font-normal text-xs">
                    More models, more creativity
                  </p>
                </div>
              </div>
            </div>
          </Link>
          {!isMobile ? (
            <Actions>
              <NavLink
                to="/faq"
                className={({ isActive }: any) =>
                  isActive ? "active" : undefined
                }
              >
                FAQ
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }: any) =>
                  isActive ? "active" : undefined
                }
              >
                <img alt="Instagram" src={Instagram} />
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }: any) =>
                  isActive ? "active" : undefined
                }
              >
                <img alt="Twitter" src={Twitter} />
              </NavLink>
              {/* <SignInBtn>Log in</SignInBtn>
                    <SignInUp>Sign up</SignInUp> */}
            </Actions>
          ) : (
            <>
              <HamburgerBtn
                stickyDefault
                toggle={toggleMobileMenu}
                onToggle={handleToggleMobileMenu}
              />
              {toggleMobileMenu && <MobileMenu />}
            </>
          )}
        </div>
      </Nav>
    );
  }
  return <React.Fragment></React.Fragment>;
};

Navbar.propTypes = {
  defaultSticky: false,
};

export default Navbar;
