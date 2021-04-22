/**
 * BreedImage Entity
 */
import Breed from "./Breed";

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
  height: number,

  /**
   * The array of breeds associated to this breed image.
   *
   * @type {Breed[]}
   */
  breeds?: Breed[]
}

export default BreedImage;
