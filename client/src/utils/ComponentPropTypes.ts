import { MouseEventHandler } from 'react';

export type PhotoCardProps = {
    imageURL: string
    id: string
    title: string
    date: string
    size: string
    format: string
    caption: string
    isLoaded: boolean
    tags: string
    categories: string
    location: string
    deleteImageCallback: (imageID: string) => void
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

export type UploadModalProps = {
    refreshImagesArray: () => void
}

export type DeleteImageDialogProps = {
    imageId: string
    deleteImageCallback: any
}

export {};