import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// import user from './tempData';

interface Store {
    user: User,
    setUser: (user: User) => void
    removeUser: () => void
    loggedIn: boolean
    setLoggedIn: (val: boolean) => void

}


export interface User {
    displayName: string
    email: string
    images: any[]
}




const useStore = create<Store>()(
    devtools(
        persist(
            (set) => ({
                loggedIn: false,
                removeUser: () => set((state) => ({ ...state, loggedIn: false, user: { displayName: '', email: '', images: [] } })),
                setLoggedIn: (val: boolean) => set((state) => ({ ...state, loggedIn: val })),
                setUser: (user) => set((state) => ({ ...state, user: user })),
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