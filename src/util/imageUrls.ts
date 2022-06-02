const IMAGE_BASE_PATH = '../../media/images';
const IMAGES = import.meta.globEager('../../media/images/**');

export const getImageUrl = (path: string): string | undefined => {
  const imageModule = IMAGES[`${IMAGE_BASE_PATH}/${path}`];
  return imageModule ? imageModule.default : undefined;
};

export const getAvatarUrls = () => {
  return Object.keys(IMAGES)
    .filter((path) => path.indexOf(`${IMAGE_BASE_PATH}/avatars`) === 0)
    .map((path) => IMAGES[path].default);
};
