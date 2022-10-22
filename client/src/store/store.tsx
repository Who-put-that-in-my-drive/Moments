import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface Store {
    user: User,
    addUser: (user: User) => void
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
            addUser: (user) => set((state) => ({ ...state, user: user })),
            loggedIn: false,
            setLoggedIn: (val: boolean) => set((state) => ({ ...state, loggedIn: val })),
            user: {
                displayName: '',
                email: '',
                images: []
            }
        })
    )
);


export default useStore;