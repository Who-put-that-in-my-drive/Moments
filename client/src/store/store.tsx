import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserStore } from '../interfaces/UserStore';
import { User } from '../interfaces/User';
// import { Image } from '../interfaces/Image';
// eslint-disable-next-line

const useStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                loggedIn: false,
                removeUser: () => set(
                    (state) => (
                        {
                            ...state,
                            loggedIn: false,
                            user: {
                                displayName: '',
                                email: '',
                                images: []
                            }
                        })
                ),
                setLoggedIn: (val: boolean) => set((state) => ({ ...state, loggedIn: val })),
                setUser: (user: User) => set((state) => ({ ...state, user: user })),
                updateUser: (updatedUser: User) => set((state) => ({
                    ...state,
                    user: {
                        ...state.user,
                        firstName: updatedUser.firstName,
                        lastName: updatedUser.lastName
                    }
                })),
                user: {
                    displayName: '',
                    email: '',
                    images: []
                }
            }),
            {
                name: 'Moments-store'
            }
        )
    )
);

export default useStore;
