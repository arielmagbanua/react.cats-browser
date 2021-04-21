import Breed from '../../data/models/Breed';
import BreedImage from '../../data/models/BreedImage';

/**
 * The base repository class that can be implemented by any repository data source
 */
abstract class CatsBreedRepositoryContract {
  /**
   * Retrieves all breeds.
   *
   * @returns Promise<Breed[]> which is promise that resolves to an array of breed.
   */
  abstract getBreeds(): Promise<Breed[]>;

  /**
   * Retrieves a specific breed.
   *
   * @param id The id of the breed
   *
   * @returns Promise<Breed> which is a promise that resolves to a breed object.
   */
  abstract getBreed(id: string): Promise<Breed>;

  /**
   * Retrieves images data for a breed.
   *
   * @param id The id of the breed.
   * @param page The page number.
   * @param limit The maximum number of results that will be returned.
   */
  abstract getBreedImages(id: string, page: number, limit: number): Promise<BreedImage[]>;
}

export default CatsBreedRepositoryContract;
