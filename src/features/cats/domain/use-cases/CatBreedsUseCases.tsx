import Breed from '../../data/models/Breed';
import BreedImage from '../entities/BreedImage';
import CatsBreedRepository from '../../data/repositories/CatsBreedRepository';
import CatsBreedRemoteDataSource from '../../data/sources/CatsBreedRemoteDataSource';
import UseCase from './UseCase';

/**
 * GetBreeds
 *
 * This class only has one use case or purpose and
 * all business logic relating to the use case should only be written here.
 * This class executes fetching of all cat breeds
 */
export class GetBreeds extends UseCase {
  /**
   * Retrieves all breeds.
   *
   * @returns Promise<Breed[]> which is promise that resolves to an array of breed.
   */
  execute(): Promise<Breed[]> {
    return this.catsBreedRepository.getBreeds();
  }
}

/**
 * GetBreed
 *
 * This class only has one use case or purpose and
 * all business logic relating to the use case should only be written here.
 * This class executes fetching specific cat breed.
 */
export class GetBreed extends UseCase {
  /**
   * Retrieves a specific breed.
   *
   * @param id The id of the breed
   *
   * @returns Promise<Breed> which is a promise that resolves to a breed object.
   */
  execute(id: string): Promise<Breed> {
    return this.catsBreedRepository.getBreed(id);
  }
}

/**
 * GetBreedImages
 *
 * This class only has one use case or purpose and
 * all business logic relating to the use case should only be written here.
 * This class executes fetching specific cat breed images.
 */
export class GetBreedImages extends UseCase {
  /**
   * Retrieves images data for a breed.
   *
   * @param id The id of the breed.
   * @param page The page number.
   * @param limit The maximum number of results that will be returned.
   */
  execute(id: string, page: number, limit: number = 10): Promise<BreedImage[]> {
    return this.catsBreedRepository.getBreedImages(id, page, limit);
  }
}

// due to limitation of react somehow it won't allow implementation of
// some injection container library for dependency injection
// we will just to manually inject the data layer repository here and the data source
const catsBreedRepository = new CatsBreedRepository(
  new CatsBreedRemoteDataSource()
);

// now create the use case instance and export the instance
export const getBreeds = new GetBreeds(catsBreedRepository);
export const getBreed = new GetBreed(catsBreedRepository);
export const getBreedImages = new GetBreedImages(catsBreedRepository);
