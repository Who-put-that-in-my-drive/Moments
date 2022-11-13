import { MouseEventHandler } from 'react';

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
    isOpen: boolean,
    onClose: () => void,
    onOpen: () => void,
    thumbnail: string,
    collectionName: string,
    numberOfItems: number,
}

export {};