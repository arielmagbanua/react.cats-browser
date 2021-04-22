import BreedImageEntity from '../../domain/entities/BreedImage';
import Breed from "../../domain/entities/Breed";

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
   * The array of breeds associated to this breed image.
   *
   * @type {Breed[]}
   */
  breeds?: Breed[];

  /**
   * Constructor
   *
   * @param id
   * @param url
   * @param width
   * @param height
   * @param breeds
   */
  constructor(id: string, url: string, width: number, height: number, breeds: Breed[]) {
    this.id = id;
    this.url = url;
    this.width = width;
    this.height = height;
    this.breeds = breeds;
  }
}

export default BreedImage;
