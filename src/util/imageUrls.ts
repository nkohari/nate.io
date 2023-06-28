type ImageModule = {
  default: string;
};

const IMAGE_BASE_PATH = '../../media/images';
const IMAGE_MODULES: Record<string, ImageModule> = import.meta.glob('../../media/images/**', {
  eager: true,
});

export const getImageUrl = (path: string): string | undefined => {
  const imageModule = IMAGE_MODULES[`${IMAGE_BASE_PATH}/${path}`];
  return imageModule ? imageModule.default : undefined;
};

export const getAllImagesInFolder = (name: string) => {
  return Object.keys(IMAGE_MODULES)
    .filter((path) => path.indexOf(`${IMAGE_BASE_PATH}/${name}`) === 0)
    .map((path) => IMAGE_MODULES[path].default);
};
