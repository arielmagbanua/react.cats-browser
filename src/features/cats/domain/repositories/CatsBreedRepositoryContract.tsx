import Breed from '../../data/models/Breed';
import BreedImage from '../../data/models/BreedImage';

/**
 * The base repository class that can be implemented by any repository data source
 */
abstract class CatsBreedRepositoryContract {
  /**
   * Retrieves all breeds.
   *
   * @returns Promise<Breed[]>
   */
  abstract getBreeds(): Promise<Breed[]>;

  /**
   * Retrieves a specific breed.
   *
   * @param id The id of the breed
   *
   * @returns Promise<Breed>
   */
  abstract getBreed(id: string): Promise<Breed>;

  /**
   * Retrieves images data for a breed.
   *
   * @param id The id of the breed.
   * @param page The page number.
   * @param limit The maximum number of results that will be returned.
   *
   * @returns Promise<BreedImage[]>
   */
  abstract getBreedImages(id: string, page: number, limit: number): Promise<BreedImage[]>;

  /**
   * Retrieve a specific cat breed image.
   *
   * @param id The id of the image.
   *
   * @returns Promise<BreedImage>
   */
  abstract getBreedImage(id: string): Promise<BreedImage>;
}

export default CatsBreedRepositoryContract;
