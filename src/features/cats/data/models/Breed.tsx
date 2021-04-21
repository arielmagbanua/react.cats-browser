import BreedEntity from '../../domain/entities/Breed';

/**
 * Breed Model
 */
class Breed implements BreedEntity {
  /**
   * The id of the breed
   *
   * @type {string}
   */
  id: string;

  /**
   * The name of the breed
   *
   * @type {string}
   */
  name: string;

  /**
   * The temperaments of the breed. This is typically comma separated string.
   *
   * @type {string}
   */
  temperament: string;

  /**
   * The description of the breed.
   *
   * @type {string}
   */
  description: string;

  /**
   * The country of origin of the breed.
   *
   * @type {string}
   */
  origin: string;

  /**
   * The reference image of a cat that represents this breed.
   *
   * @type {string}
   */
  referenceImageId?: string;

  /**
   * Constructor
   *
   * @param id
   * @param name
   * @param temperament
   * @param description
   * @param origin
   * @param referenceImageId
   */
  constructor(
    id: string,
    name: string,
    temperament: string,
    description: string,
    origin: string,
    referenceImageId: string
  ) {
    this.id = id;
    this.name = name;
    this.temperament = temperament;
    this.description = description;
    this.origin = origin;
    this.referenceImageId = referenceImageId;
  }
}

export default Breed;
