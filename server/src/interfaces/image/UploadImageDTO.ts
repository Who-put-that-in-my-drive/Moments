export interface UploadImageDTO {
    title: string,
    format: string,
    size: string,
    caption: string,
    tags: string[],
    categories: string[],
    ownerId: string,
    location: string,
}
