// import { Image } from './Image';
import { User } from './User';

export interface UserStore {
    user: User,
    setUser: (user: User) => void
    removeUser: () => void
    loggedIn: boolean
    setLoggedIn: (val: boolean) => void
    updateUser: (updatedUser: User) => void
    updateImagesList: (newImagesList: any[]) => void
    deleteImage: (imageId: string) => void
}
