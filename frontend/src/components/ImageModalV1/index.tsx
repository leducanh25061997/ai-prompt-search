import { Popover } from '@headlessui/react'
import React, { useContext, useEffect, useRef, useState, } from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
  } from "react-share";
import { AppContext } from '@context/AppContext';

import ShortIconWhite from '@assets/ShortIconWhite.svg';
import Galerie from '@assets/galerie.svg';

import LexicaRightLogo from '@assets/lexica.svg';
import OpenartRightLogo from '@assets/openart.svg';



import HeartIcon from '@components/Icons/HeartIcon';
import DownloadIcon from '@components/Icons/DownloadIcon';
import ShareIcon from '@components/Icons/ShareIcon';
import InfoIcon from '@components/Icons/InfoIcon';

import SquareIcon from '@components/Icons/SquareIcon';
import HorizontalIcon from '@components/Icons/HorizontalIcon';
import VerticalIcon from '@components/Icons/VerticalIcon';


import {
    HeartBtn,
    ActionBtn,
    ActionText,
    ApplyBtn,
} from './index.styled';
import { NavLink } from 'react-router-dom';
import IImage from '@/models/IImage';
import { FilterTrackerParams } from '@/types/Filter';
import { Tracker } from '@/types/Enum';
import TrackerService from '@/services/TrackerService';
import { logEvent } from '@firebase/analytics';
import { analytics } from '@/utils/firebaseConfig';
import SimilarImageService from '@/services/SimilarImageService';
import ImageService from '@/services/ImageService';
import ReactMasonry from '../ReactMasonry';
import CustomImagService from '@/services/CustomImagService';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactLoading from "react-loading";
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useScrollLock } from '@/hooks/useScrollLock';

interface CustomImage {
    id: number;
    isSelect: boolean;
    icon: React.ReactNode;
    title: string;
    isCurrent: boolean;
    size: string;
}

// Ref: https://headlessui.com/react/dialog#styling-the-dialog
export default function ImageModal1(
) {
    const { isOpenModal, setIsOpenModal, setRemixOnClick, setFavoriteData, favoriteData } = useContext(AppContext);
    const [selectedImage, setSelectedImage] = useState<IImage | null>();
    const isActiveHeartCtx = selectedImage && selectedImage.id ? favoriteData[selectedImage.id] : false;
    const [isLoadingApply, setIsLoadingApply] = useState<boolean>(false);
    const refWrapperModal = useRef<HTMLInputElement>(null);
    const [customImage, setCustomImage] = useState<CustomImage[]>([
        {
            id: 1,
            isSelect: true,
            title: 'Square',
            icon: <SquareIcon />,
            isCurrent: true,
            size: 'square',
        },
        {
            id: 2,
            isSelect: false,
            title: 'Horizontal',
            icon: <HorizontalIcon />,
            isCurrent: false,
            size: 'horziontal',
        },
        {
            id: 3,
            isSelect: false,
            title: 'Vertical',
            icon: <VerticalIcon />,
            isCurrent: false,
            size: 'vertical'
        }
    ]);
    const [similarImages, setSimilarImages] = useState<IImage[]>([]);
    const location = useLocation();
    const { unlockScroll } = useScrollLock();

    React.useEffect(() => {
        const params = queryString.parse(location.search, {
          arrayFormat: 'bracket',
        });
        if (params && Object.keys(params).length > 0) {
            if (params.imgaeId) {
                fetchDetailImage(params.imgaeId.toString());
                fetchSimilarImgage(params.imgaeId.toString());
            }
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    const fetchDetailImage = async (id: string) => {
        const res = await ImageService(id);
        setSelectedImage(res);
    }

    const fetchSimilarImgage = async (imageId: string) => {
        const res = await SimilarImageService(imageId);
        if (res?.length > 0) {
            setSimilarImages(res);
        }
        
    }
    
    function closeModal() {
        setIsOpenModal(false);
        setSelectedImage(null);
        unlockScroll();
    }

    const handleActiveHeart = () => {
        if (selectedImage && selectedImage.id) {
            logEvent(analytics, 'like');
            const params: FilterTrackerParams = {
                user_id: 1,
                results_id: Number(selectedImage.id),
                action: Tracker.LIKE,
            };
            TrackerService(params);
            setFavoriteData({ ...favoriteData, [`${selectedImage.id}`]: !isActiveHeartCtx });
        }
    };
    
    const handleDownload = () => {
        if (selectedImage) {
            const anchor: any = document.createElement('a');
            const params: FilterTrackerParams = {
                user_id: 1,
                results_id: Number(selectedImage.id),
                action: Tracker.DOWNLOAD,
            };
            logEvent(analytics, 'dowload');
            TrackerService(params);
            if (selectedImage.src?.includes('webp')) {
                // TODO: below ony view new tab
                anchor.href = selectedImage.src;
                anchor.download = selectedImage.src;
                anchor.target = "_blank";
                document.body.appendChild(anchor);
                anchor.click();
            } else {
                anchor.href = selectedImage.src;
                anchor.download = selectedImage.src;
                document.body.appendChild(anchor);
                anchor.click();
            }
            document.body.removeChild(anchor);
        }
    };

    const handleRemix = (id?: string | number) => {
        if (id) {
            const params: FilterTrackerParams = {
                user_id: 1,
                results_id: Number(id),
                action: Tracker.SHARE,
            };
            TrackerService(params);
        }
        setIsOpenModal(false);
        setRemixOnClick(selectedImage?.prompt ?? "");  
    };

    const renderIcon = (image: IImage) => {
        const { source = '' } = image;
        switch (source) {
            case 'lexica':
                return <img src={LexicaRightLogo} alt='Lexica' />;
            case 'galerie':
                return <img src={Galerie} alt='galerie' />;
            case 'openart':
                return <img src={OpenartRightLogo} alt='openart' />;
            default:
                return <img src={ShortIconWhite} style={{ height: 32 }} alt='Galerie' />;
        }
    }

    const handleShare = (id?: string | number) => {
        if (id) {
            logEvent(analytics, 'share');
            const params: FilterTrackerParams = {
                user_id: 1,
                results_id: Number(id),
                action: Tracker.SHARE,
            };
            TrackerService(params);
        }
    }

    const handleChange = (value: CustomImage, index: number) => {
        const _customImage: CustomImage[] = [...customImage];
        _customImage.map((_image: CustomImage) => {
            _image.isSelect = false;
            return _image;
        })
        _customImage.splice(index, 1, {...value, isSelect: true});
        setCustomImage(_customImage);
    }

    const handleClickApply = async () => {
        setIsLoadingApply(true);
        const _customImage: CustomImage[] = [...customImage];
        const value = customImage.filter((item: CustomImage) => item.isSelect)[0]
        const res = await CustomImagService({ size: value.size, result_id: selectedImage?.id});
        const index = _customImage.findIndex((item: CustomImage) => item.isSelect)
        if (res) {
            _customImage.map((_image: CustomImage) => {
                _image.isCurrent = false;
                return _image;
            })
            _customImage.splice(index, 1, {...value, isCurrent: true});
            setIsLoadingApply(false);
            setCustomImage(_customImage);
            
        }
        
    }

    return (
        <>
            {isOpenModal ? (
                <div className="fixed inset-0 z-10 overflow-y-auto" ref={refWrapperModal}>
                    <NavLink
                        to={`/`}
                    >
                    <div
                        className="hidden sm:block fixed inset-0 w-full h-full bg-black opacity-40"
                        onClick={() => { unlockScroll();; setIsOpenModal(false)}}
                    ></div>
                    </NavLink>
                    <div className="flex items-center min-h-screen sm:px-4 sm:py-8">
                        <div className="relative max-w-[1069px] py-4 sm:py-0 sm:p-4 mx-auto bg-white rounded-[20px] shadow-lg flex lg:flex-row flex-row">
                            <NavLink
                                to={`/`}
                            >
                                <div
                                    className="hidden absolute top-[-10px] right-[-50px] text-neutral-100 cursor-pointer h-12 w-12 sm:flex items-center justify-center text-4xl drop-shadow"
                                    onClick={closeModal}
                                >
                                    <svg stroke="#FFFFFF" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </div>
                            </NavLink>

                            <div className="flex flex-col sm:py-6">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="flex justify-between sm:hidden px-4 sm:px-0">
                                        <div className="text-lg opacity-100">
                                            {selectedImage && Object.keys(selectedImage).length > 0 && renderIcon(selectedImage)}
                                        </div>
                                        <div
                                            className="text-neutral-100 cursor-pointer flex items-center justify-center text-4xl drop-shadow"
                                            onClick={closeModal}
                                        >
                                            <svg stroke="#0C0534" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                                                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="relative lg:mr-6 sm:w-1/2">
                                        <img 
                                            alt={selectedImage?.title}
                                            className='rounded-lg'
                                            src={selectedImage?.src}
                                            style={{ objectFit: "cover", maxWidth: '512px', width: '100%' }}>
                                        </img>
                                        
                                    </div>
                                    <div className="overflow-hidden text-base flex flex-col h-auto lg:px-0 px-4 sm:w-1/2">
                                        <div className="flex justify-end sm:justify-between">
                                            <div className="text-lg opacity-100 hidden sm:flex">
                                                {selectedImage && Object.keys(selectedImage).length > 0 && renderIcon(selectedImage)}
                                            </div>
                                            <div className="flex">
                                                <div className="">
                                                    {/* <ActionBtn onClick={() => handleRemix(selectedImage?.id)}>
                                                        <EditIcon />
                                                        <ActionText>Remix</ActionText>
                                                    </ActionBtn> */}
                                                    

                                                    <Popover className="relative">
                                                        <Popover.Button>
                                                            <ActionBtn>
                                                                <DownloadIcon />
                                                            </ActionBtn>
                                                        </Popover.Button>

                                                        <Popover.Panel className="absolute z-10 w-[240px] right-0 bg-white">
                                                            <div className="px-4 py-6 shadow-lg rounded-lg flex flex-col">
                                                                <div className="flex cursor-pointer">
                                                                    <p className="font-medium text-sm mr-5 text-neutral-100">HD</p>
                                                                    <p className="font-normal text-sm text-[#6D6985]">512 x 512</p>
                                                                </div>
                                                                <div className="flex cursor-pointer mt-4">
                                                                    <p className="font-medium text-sm mr-5 text-neutral-100">Full HD</p>
                                                                    <p className="font-normal text-sm text-[#6D6985]">1024 x 1024</p>
                                                                </div>
                                                                <div className="flex cursor-pointer mt-4">
                                                                    <p className="font-medium text-sm mr-5 text-neutral-100">Original</p>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Popover>
                                                </div>
                                                <div className="mx-3">
                                                    <Popover className="relative">
                                                        <Popover.Button>
                                                            <ActionBtn>
                                                                <ShareIcon />
                                                                {/* <ActionText>Share</ActionText> */}
                                                            </ActionBtn>
                                                        </Popover.Button>

                                                        <Popover.Panel className="absolute z-10 mt-4 bg-white rounded-lg w-[400px] right-0 shadow-[0px_0px_8px_rgba(0,0,0,0.06),0px_8px_8px_rgba(0,0,0,0.08)]">
                                                            <div className="flex px-4 py-4 shadow-lg rounded-lg flex-col">
                                                                <p className="font-semibold text-neutral-100 text-xl text-center">Share</p>
                                                                <div className="flex justify-around mt-2">
                                                                    <FacebookShareButton
                                                                        onClick={() => handleShare(selectedImage?.id)}
                                                                        url={selectedImage?.src || ''}
                                                                        quote={selectedImage?.caption || ''}
                                                                        className="mr-4 flex flex-col items-center"
                                                                    >
                                                                        <FacebookIcon size={24} round />
                                                                        <p className="mt-2">Facebook</p>
                                                                    </FacebookShareButton>
                                                                    <TwitterShareButton
                                                                        onClick={() => handleShare(selectedImage?.id)}
                                                                        url={selectedImage?.src || ''}
                                                                        title={selectedImage?.caption || ''}
                                                                        className="flex flex-col items-cente"
                                                                    >
                                                                        <TwitterIcon size={24} round />
                                                                        <p className="mt-2">Twitter</p>
                                                                    </TwitterShareButton>
                                                                    <FacebookShareButton
                                                                        onClick={() => handleShare(selectedImage?.id)}
                                                                        url={selectedImage?.src || ''}
                                                                        quote={selectedImage?.caption || ''}
                                                                        className="mr-4 flex flex-col items-center"
                                                                    >
                                                                        <FacebookIcon size={24} round />
                                                                        <p className="mt-2">Facebook</p>
                                                                    </FacebookShareButton>
                                                                </div>
                                                                <div className="mt-4 flex justify-between">
                                                                    <div className="w-[248px] overflow-hidden text-ellipsis border-[1px] h-[40px] rounded-lg px-4 pt-[10px]">
                                                                        {selectedImage?.src || ''}
                                                                    </div>
                                                                    <CopyToClipboard text={selectedImage?.src || ''} >
                                                                        {/* <div>{selectedImage?.src || ''}</div> */}
                                                                        <div className="cursor-pointer bg-neutral-100 text-white rounded-lg px-[29px] py-[8px]">Copy</div>
                                                                    </CopyToClipboard>
                                                                </div>
                                                            </div>
                                                            
                                                        </Popover.Panel>
                                                    </Popover>
                                                </div>
                                                <div>
                                                    <HeartBtn onClick={handleActiveHeart}>
                                                        <HeartIcon active={!!isActiveHeartCtx} color={!!isActiveHeartCtx ? 'red' : '#0C0534'} />
                                                    </HeartBtn>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-base font-semibold text-neutral-100">Title</p>
                                        </div>
                                        <div style={{ maxWidth: 480 }} className="px-4 py-3 bg-neutral-5 rounded-xl font-light flex flex-col space-y-5 mt-2">
                                            <p>
                                                {(selectedImage?.title !== "" && selectedImage?.title !== undefined)
                                                    ? selectedImage?.title
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div className="mt-5">
                                            <p className="text-base font-semibold text-neutral-100">Description</p>
                                        </div>
                                        <div style={{ maxWidth: 480, maxHeight: 250, overflow: 'auto' }} className="px-4 py-3 bg-neutral-5 rounded-xl font-light flex flex-col space-y-5 mt-2">
                                            <p>
                                                {(selectedImage?.prompt !== "" && selectedImage?.prompt !== undefined)
                                                    ? selectedImage?.prompt
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div className="text-base text-neutral-100 mt-4 font-semibold">Custom image</div>
                                        <div className="relative border rounded-xl p-5 mt-4">
                                            <div className="bg-white flex items-center absolute top-[-12px] px-4">
                                                <p className="text-[#6D6985] text-base mr-3">Size</p>
                                                
                                                
                                                <div className="group flex relative">
                                                    <InfoIcon />
                                                    <span className="group-hover:opacity-100 transition-opacity w-[240px] bg-white text-sm text-neutral-100 rounded-xl absolute left-1/2 
                                                        translate-y-2 p-3 opacity-0 m-4 mx-auto shadow-[0px_0px_8px_rgba(0,0,0,0.06),0px_8px_8px_rgba(0,0,0,0.08)]">You can customize this image size by creating a new image with similar details</span>
                                                </div>
                                            </div>
                                            {customImage.map((item: CustomImage, index: number) => (
                                                <div key={item.id} className={`flex items-center justify-between ${index > 0 ? 'mt-2' : ''}`}>
                                                    <div className="flex">
                                                        <div className="w-[50px] flex justify-center">
                                                            {item.icon}
                                                        </div>
                                                        
                                                        <p className="text-neutral-100 font-medium text-base mr-3">{item.title}</p>
                                                        <p className="text-[#9E9BAE]">{`${item.isCurrent ? 'Current size' : ''}`}</p>
                                                    </div>
                                                    <div>
                                                        <input 
                                                            id={`option_${item.title}`}
                                                            type="radio" 
                                                            name={item.title} 
                                                            value={item.title} 
                                                            className="h-5 w-5 border-gray-300 accent-[#121212]" 
                                                            aria-labelledby="country-option-1" 
                                                            aria-describedby="country-option-1" 
                                                            checked={item.isSelect} 
                                                            onChange={() => handleChange(item, index)}
                                                        />
                                                    </div>
                                                    
                                                </div> 
                                            ))}            
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <ApplyBtn onClick={handleClickApply}>
                                                {isLoadingApply ? (
                                                    <ReactLoading type="spin" color="#FFFFFF" height={18} width={18} />
                                                ) : <p className="text-white text-sm">Apply</p>}
                                                
                                            </ApplyBtn>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 sm:px-0">
                                    <div className="mt-4">
                                        <p className="text-base font-semibold text-neutral-100">Similar images</p>
                                    </div>
                                    <div className="mt-4">
                                        {similarImages.length > 0 && (
                                            <ReactMasonry 
                                                breakpointCols={{
                                                    default: 4,
                                                    500: 1,
                                                }}
                                                data={similarImages}
                                                wrapper={refWrapperModal}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
