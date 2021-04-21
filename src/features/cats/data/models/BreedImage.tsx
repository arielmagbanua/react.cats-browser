import BreedImageEntity from '../../domain/entities/BreedImage';

/**
 * BreedImage Model
 */
class BreedImage implements BreedImageEntity {
  /**
   * The id of the breed
   *
   * @type {string}
   */
  id: string;

  /**
   * The url of the breed image.
   *
   * @type {string}
   */
  url: string;

  /**
   * The width of the image.
   *
   * @type {number}
   */
  width: number;

  /**
   * The height of the image.
   *
   * @type {number}
   */
  height: number;

  /**
   * Constructor
   *
   * @param id
   * @param url
   * @param width
   * @param height
   */
  constructor(id: string, url: string, width: number, height: number) {
    this.id = id;
    this.url = url;
    this.width = width;
    this.height = height;
  }
}

export default BreedImage;
