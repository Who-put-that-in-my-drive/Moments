import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface Store {
    user: User,
    setUser: (user: User) => void
    loggedIn: boolean
    setLoggedIn: (val: boolean) => void
}


interface User {
    displayName: string
    email: string
    images: []
}




const useStore = create<Store>()(
    devtools(
        (set) => ({
            loggedIn: false,
            setLoggedIn: (val: boolean) => set((state) => ({ ...state, loggedIn: val })),
            setUser: (user) => set((state) => ({ ...state, user: user })),
            user: {
                displayName: '',
                email: '',
                images: []
            }
        })
    )
);


export default useStore;