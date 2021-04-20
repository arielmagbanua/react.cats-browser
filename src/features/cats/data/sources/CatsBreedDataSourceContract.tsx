import Breed from '../models/Breed';
import BreedImage from '../models/BreedImage';

/**
 * The breed data source interface / contract for abstracting any data source for the breeds
 */
abstract class CatsBreedDataSourceContract {

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

export default CatsBreedDataSourceContract;
