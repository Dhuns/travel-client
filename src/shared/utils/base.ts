/**
 * Get full S3 URL for item images
 * @param imgName - Image filename from itemSrc (e.g., "1754279055299_0.jpg")
 * @returns Full CloudFront URL or empty string if no image
 */
export const getItemImg = (imgName?: string): string => {
  if (!imgName) return '';
  return `${process.env.NEXT_PUBLIC_ASSET_URL}/items/${imgName}`;
};

/**
 * Get full S3 URL for package images
 * @param imgName - Image filename
 * @returns Full CloudFront URL or empty string if no image
 */
export const getPackageImg = (imgName?: string): string => {
  if (!imgName) return '';
  return `${process.env.NEXT_PUBLIC_ASSET_URL}/packages/${imgName}`;
};

/**
 * Format number with comma separators
 * @param num - Number to format
 * @returns Formatted string with commas
 */
export const comma = (num: number | string | undefined): string => {
  if (num === undefined) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
