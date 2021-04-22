import Breed from '../models/Breed';
import BreedImage from '../models/BreedImage';

/**
 * The breed data source interface / contract for abstracting any data source for the breeds
 */
abstract class CatsBreedDataSourceContract {
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

export default CatsBreedDataSourceContract;
