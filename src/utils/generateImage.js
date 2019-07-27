export default generateImage = (image) => {
    if (image.media && image.media[0] && image.media[0]['media-metadata'] && image.media[0]['media-metadata'][2] && image.media[0]['media-metadata'][2].url) {
        return image.media[0]['media-metadata'][2].url;
    }
    if (image.multimedia && image.multimedia[2] && image.multimedia[2].url) {
        return image.multimedia[2].url;
    }
    return 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1518711/910/607/m1/fpnw/wm0/lawyer-avatar-icon-01-.jpg?1470209857&s=89c9e32338a33862d93a44b76a1ae3e9';
}




  