import CatsBreedRepositoryContract from '../../domain/repositories/CatsBreedRepositoryContract';
import Breed from '../models/Breed';
import BreedImage from '../models/BreedImage';
import CatsBreedDataSourceContract from '../sources/CatsBreedDataSourceContract';

/**
 * The cats breed repository which uses the remote data source for
 * retrieving cats breed and images.
 */
class CatsBreedRepository extends CatsBreedRepositoryContract {
  constructor(private remoteDataSource: CatsBreedDataSourceContract) {
    super();
  }

  /**
   * Retrieves all breeds.
   *
   * @returns Promise<Breed[]>
   */
  getBreeds(): Promise<Breed[]> {
    return this.remoteDataSource.getBreeds();
  }

  /**
   * Retrieves a specific cat breed.
   *
   * @param id The id of the breed
   *
   * @returns Promise<Breed>
   */
  getBreed(id: string): Promise<Breed> {
    return this.remoteDataSource.getBreed(id);
  }

  /**
   * Retrieves images data for a cat breed.
   *
   * @param id The id of the breed.
   * @param page The page number.
   * @param limit The maximum number of results that will be returned.
   *
   * @returns Promise<BreedImage[]>
   */
  getBreedImages(id: string, page: number, limit: number): Promise<BreedImage[]> {
    return this.remoteDataSource.getBreedImages(id, page, limit);
  }

  /**
   * Retrieve a specific cat breed image.
   *
   * @param id The id of the image.
   *
   * @returns Promise<BreedImage>
   */
  getBreedImage(id: string): Promise<BreedImage> {
    return this.remoteDataSource.getBreedImage(id);
  }
}

export default CatsBreedRepository
