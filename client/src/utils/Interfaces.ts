export interface User {
    displayName: string
    email: string
    images: any[]
}

export interface Store {
    user: User,
    setUser: (user: User) => void
    removeUser: () => void
    loggedIn: boolean
    setLoggedIn: (val: boolean) => void

}

export interface Image {
    title: string,
    format: string,
    size: string,
    caption: string,
    tags: string[],
    categories: string[],
    owner: string,
    location: string,
    lastModifiedDateTime: number,
    uploadedDateTime: number,
}

export { };