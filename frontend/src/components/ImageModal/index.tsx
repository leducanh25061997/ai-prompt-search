import { Dialog, Transition, Popover } from '@headlessui/react'
import { Fragment, useContext, } from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
  } from "react-share";
import { AppContext } from '@context/AppContext';

import LexicaLogo from '@assets/LexicaLogo.svg';
import OpenArtLogo from '@assets/OpenArtLogo.svg';
import ShortIconWhite from '@assets/ShortIconWhite.svg';

import HeartIcon from '@components/Icons/HeartIcon';
import EditIcon from '@components/Icons/EditIcon';
import DownloadIcon from '@components/Icons/DownloadIcon';
import ShareIcon from '@components/Icons/ShareIcon';


import {
    HeartBtn,
    ActionBtn,
    SourceImage,
    ActionText,
} from './index.styled';

// Ref: https://headlessui.com/react/dialog#styling-the-dialog
export default function ImageModal(
) {
    const { isOpenModal, setIsOpenModal, selectedImage, setSelectedImage, setRemixOnClick, setFavoriteData, favoriteData } = useContext(AppContext);
    
    const isActiveHeartCtx = selectedImage && selectedImage.id ? favoriteData[selectedImage.id] : false;
    
    async function closeModal() {
        setIsOpenModal(false);
        setSelectedImage(null);
    }

    const handleActiveHeart = () => {
        if (selectedImage && selectedImage.id) {
            setFavoriteData({ ...favoriteData, [`${selectedImage.id}`]: !isActiveHeartCtx });
        }
    };
    
    const handleDownload = () => {
        if (selectedImage) {
            const anchor: any = document.createElement('a');
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

    const handleRemix = () => {
        setIsOpenModal(false);
        setRemixOnClick(selectedImage?.prompt ?? "");  
    };

    const renderSourceImg = () => {
        if (selectedImage) {
            const { source = '' } = selectedImage;
            switch (source) {
                case 'lexica':
                    return <SourceImage src={LexicaLogo} alt='Lexica' />;
                case 'openart':
                    return <SourceImage src={OpenArtLogo} alt='OpenArt' />;
                default:
                    return <SourceImage src={ShortIconWhite} style={{ height: 32 }} alt='Galerie' />;
            }
        }
    };
    

    return (
        <>
            <Transition appear show={isOpenModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 w-screen h-screen overflow-auto px-8 py-8 flex justify-center items-center z-50 bg-zinc-900 bg-opacity-80">
                        <div
                            className="absolute top-0 text-white right-0 cursor-pointer h-12 w-12 flex items-center justify-center text-4xl drop-shadow"
                            onClick={closeModal}
                        >
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>

                        <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-700 box-content">
                            <Transition.Child
                                as={Fragment}
                            >

                                <Dialog.Panel className="flex w-full bg-white self-stretch lg:flex-row flex-col-reverse pb-0 pt-0 px-0 md:pb-8 lg:pt-8 lg:px-4">
                                    <div className="overflow-hidden text-base lg:mr-6 flex flex-col h-auto lg:px-0 px-4">
                                        <div className="text-lg opacity-100">Prompt</div>
                                        <div style={{ maxWidth: 480, maxHeight: 250, overflow: 'auto' }} className="px-4 py-3 bg-gray-400 rounded-xl shadow bg-opacity-50 font-light flex flex-col space-y-5">
                                            <p>
                                                {(selectedImage?.prompt !== "" && selectedImage?.prompt !== undefined)
                                                    ? selectedImage?.prompt
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div className="md:mt-6 mt-4 opacity-100 ml-2 grid grid-cols-2 gap-2 lg:flex flex-wrap md:flex-col md:space-x-0 md:space-y-1 h-auto md:pb-0 pb-8">
                                            <div>
                                                <div className="text-lg opacity-100">Model name</div>
                                                <div className="text-base opacity-70">{selectedImage?.model_name ? selectedImage?.model_name : "N/A"}</div>
                                            </div>
                                            <div>
                                                <div className="text-lg opacity-100">Seed</div>
                                                <div className="text-base opacity-70">{selectedImage?.seed ? selectedImage?.seed : "N/A"}</div>
                                            </div>
                                            <div>
                                                <div className="text-lg opacity-100">Guidance scale</div>
                                                <div className="text-base opacity-70">{selectedImage?.cfg_scale ? selectedImage?.cfg_scale : "N/A"}</div>
                                            </div>
                                            <div>
                                                <div className="text-lg opacity-100">Dimensions</div>
                                                <div className="text-base opacity-70">{(selectedImage?.height && selectedImage?.width)
                                                    ? (String(selectedImage?.height) + " x " + String(selectedImage?.width))
                                                    : "N/A"}</div>
                                            </div>
                                        </div>
                                        <div className="mt-8 mb-4 flex">
                                            <div className="flex flex-auto">
                                                <ActionBtn onClick={handleRemix}>
                                                    <EditIcon />
                                                    <ActionText>Remix</ActionText>
                                                </ActionBtn>
                                                <ActionBtn onClick={handleDownload}>
                                                    <DownloadIcon />
                                                    <ActionText>Download</ActionText>
                                                </ActionBtn>
                                                
                                                <Popover className="relative">
                                                    <Popover.Button>
                                                        <ActionBtn>
                                                            <ShareIcon />
                                                            <ActionText>Share</ActionText>
                                                        </ActionBtn>
                                                    </Popover.Button>

                                                    <Popover.Panel className="absolute z-10 bottom-10">
                                                        <div className="flex px-4 py-4 shadow-lg rounded-lg">
                                                            <FacebookShareButton
                                                                url={selectedImage?.src || ''}
                                                                quote={selectedImage?.caption || ''}
                                                                className="mr-4"
                                                            >
                                                                <FacebookIcon size={24} round />
                                                            </FacebookShareButton>
                                                            <TwitterShareButton
                                                                url={selectedImage?.src || ''}
                                                                title={selectedImage?.caption || ''}
                                                            >
                                                                <TwitterIcon size={24} round />
                                                            </TwitterShareButton>
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

                                    <div className="relative" style={{
                                        marginBottom: "10px",
                                    }}>
                                        {renderSourceImg()}
                                        <img alt={selectedImage?.src}
                                            className='lg:rounded-lg'
                                            src={selectedImage?.src}
                                            style={{ objectFit: "cover", maxWidth: '512px', width: '100%', maxHeight: '768px' }}>
                                        </img>
                                    </div>
                                </Dialog.Panel>


                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
