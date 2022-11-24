import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserStore } from '../interfaces/UserStore';
import { User } from '../interfaces/User';
import { Image } from '../interfaces/Image';

const initialUserState: User = {
    displayName: '',
    email: '',
    images: [],
    profilePictureURL: ''
};

const useStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                //imageObj to be switched to type Image instead of any once we have proper format
                addImage: (imageObj: any) => set((state) => ({
                    ...state,
                    user: {
                        ...state.user,
                        images: [...state.user.images].concat(imageObj)
                    }
                })),
                deleteImage: (imageId: string) => set((state) => ({
                    ...state,
                    user: {
                        ...state.user,
                        images: state.user.images.filter((imageObj: Image) => (imageObj.id != imageId))
                    }
                })),
                loggedIn: false,
                removeUser: () => set(
                    (state) => (
                        {
                            ...state,
                            loggedIn: false,
                            user: initialUserState
                        })
                ),
                setLoggedIn: (val: boolean) => set((state) => ({ ...state, loggedIn: val })),
                setUser: (user: User) => set((state) => ({ ...state, user: user })),
                updateImagesList: (newImages: any[]) => set((state) => ({
                    ...state,
                    user: {
                        ...state.user,
                        images: newImages
                    }
                })),
                updateProfilePicture: (pictureURL: string) => set((state) => ({
                    ...state,
                    user: {
                        ...state.user,
                        profilePictureURL: pictureURL
                    }
                })),
                updateUser: (updatedUser: User) => set((state) => ({
                    ...state,
                    user: {
                        ...state.user,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName
                    }
                })),
                user: initialUserState,
            }),
            {
                name: 'Moments-store'
            }
        )
    )
);

export default useStore;
