/**
 * Breed Model
 */
interface Breed {
  /**
   * The id of the breed
   *
   * @type {string}
   */
  id: string

  /**
   * The name of the breed
   *
   * @type {string}
   */
  name: string,

  /**
   * The temperaments of the breed. This is typically comma separated string.
   *
   * @type {string}
   */
  temperament: string,

  /**
   * The description of the breed.
   *
   * @type {string}
   */
  description: string,

  /**
   * The country of origin of the breed.
   *
   * @type {string}
   */
  origin: string,

  /**
   * The reference image of a cat that represents this breed.
   *
   */
  referenceImageId?: string,
}

export default Breed;
