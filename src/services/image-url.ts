// crops the images so that they are not HD and take too long to load

const getCroppedImageUrl = (url:string) => {
    const target = 'media/'
    const index = url.indexOf(target) + target.length
    return url.slice(0, index) + 'crop/600/400/' + url.slice(index)
}

export default getCroppedImageUrl