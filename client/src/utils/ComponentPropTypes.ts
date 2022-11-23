import { MouseEventHandler } from 'react';
import { Image } from '../interfaces/Image';




export type PhotoCardProps = {
    imageURL: string
    name: string
    date: string
    size: string
    format: string
};

export type DrawerImageInfoProps = {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    imageInfo: PhotoCardProps
};

export type HeaderProps = {
    onShowSidebar: MouseEventHandler
    showSidebarButton?: boolean
}

export type SideNavBarProps = {
    onClose: () => void
    isOpen: boolean
    variant: 'drawer' | 'sidebar' | any
};

export type CollectionProps = {
    images: Image[],
    count: number,
    collectionName: string,
    thumbnail: string,
    // displayCollection is for development testing 
    displayCollection: any[],
    setShowCollection: (showCollection: number) => void;
    setDisplayCollection: (displayCollection : any) => void;
    setCollectionName: (collectionName: string) => void;
    
}

export {};