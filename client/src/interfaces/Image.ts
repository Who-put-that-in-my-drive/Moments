export interface Image {
    id: string
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
