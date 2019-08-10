export const links = {
    github: "https://github.com/joshsp98/faceswap"
};

export const navSectionIds = {
    home: 'home',
    swap: 'swap'
};

export const navSections = [
    {
        name: "Home",
        link: "/",
        id: navSectionIds.home
    },
    {
        name: "Do a swap!",
        link: "/swap",
        id: navSectionIds.swap
    }
];

export const photoChooseType = {
    none: 'none',
    webcam: 'webcam',
    upload: 'upload'
};

export const reducerActions = {
    changePhoto: 'photo',
    newPhoto: 'newPhoto',
    changePhotoType: 'photoType',
    newPhotoType: 'newPhotoType',
};