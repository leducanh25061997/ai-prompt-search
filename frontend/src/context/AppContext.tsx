import { createContext } from 'react'
import IImage from '@models/IImage'

export type AppContextType = {
  selectedImage: IImage | null,
  setSelectedImage: (v: IImage | null) => void
  isOpenModal: boolean
  setIsOpenModal: (v: boolean) => void, 
  remixOnClick:  string, 
  setRemixOnClick: (v: string) => void,
  favoriteData: any,
  setFavoriteData: (v: any) => void,
  showSidebar: boolean,
  setShowSidebar: (v: boolean) => void,
}

export const AppContext = createContext<AppContextType>({
  selectedImage: null, 
  setSelectedImage: () => {}, 
  isOpenModal: false, 
  setIsOpenModal: () => {}, 
  remixOnClick: "", 
  setRemixOnClick: () => {},
  favoriteData: [],
  setFavoriteData: () => {},
  showSidebar: false,
  setShowSidebar: (v: boolean) => {},
})
