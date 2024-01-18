import * as sharp from 'sharp';

export const sharpHelper = async (
  imagePath: string,
  thumbnailPath: string,
  thumbnailSize = process.env.BASE_THUMBNAIL_SIZE,
) => {
  const [width, height] = thumbnailSize.split('x');

  try {
    await sharp(imagePath).resize(+width, +height).toFile(thumbnailPath);
    return true;
  } catch (e) {
    return false;
  }
};
