import { MouseEventHandler } from 'react';

export type PhotoCardProps = {
    imageURL: string
    title: string
    date: string
    size: string
    format: string
    caption: string
    isLoaded: boolean
    tags: string
    categories: string
    location: string
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
    images: string[],
    collectionName: string,
}

export {};