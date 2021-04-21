/**
 * BreedImage Entity
 */
interface BreedImage {
  /**
   * The id of the breed
   *
   * @type {string}
   */
  id: string,

  /**
   * The url of the breed image.
   *
   * @type {string}
   */
  url: string,

  /**
   * The width of the image.
   *
   * @type {number}
   */
  width: number,

  /**
   * The height of the image.
   *
   * @type {number}
   */
  height: number
}

export default BreedImage;
