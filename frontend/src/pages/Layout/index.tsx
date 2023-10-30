import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AppContext } from '@context/AppContext';
import ImageModal from '@components/ImageModal';
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import GlobalStyles from '@/global.styled';
import React, { useMemo, useState } from 'react';
import IImage from '@models/IImage';
import 'react-toastify/dist/ReactToastify.css';
import ImageModal1 from "@/components/ImageModalV1";

function Layout() {
  const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const location = useLocation();
  const { pathname } = location;
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  
  const [remixOnClick, setRemixOnClick] = useState("");
  const [favoriteData, setFavoriteData] = useState({});
  const routes = React.useMemo(() => ['/faq'], []);

  const value = useMemo(
    () => ({ 
      selectedImage, setSelectedImage, 
      isOpenModal, setIsOpenModal, 
      remixOnClick, setRemixOnClick,
      favoriteData, setFavoriteData,
      showSidebar, setShowSidebar,
    }),
    [selectedImage, isOpenModal, remixOnClick, favoriteData, setFavoriteData, showSidebar]
  );

  return (
    <AppContext.Provider
      value={value}
    >
      <GlobalStyles />
      <div className="App">
        <Navbar defaultSticky={routes.includes(pathname)} />
        <Outlet />
        {/* <Footer /> */}
        {/* <ImageModal /> */}
        <ImageModal1 />
        <ToastContainer
          limit={3}
          autoClose={3000}
          position='top-right'
          theme='light'
        />
      </div>
    </ AppContext.Provider >
  );
}

export default Layout;
