import CatsBreedRepositoryContract from '../repositories/CatsBreedRepositoryContract';
import Breed from '../../data/models/Breed';
import CatsBreedRepository from '../../data/repositories/CatsBreedRepository';
import CatsBreedRemoteDataSource from '../../data/sources/CatsBreedRemoteDataSource';

/**
 * The GetBreeds use case class
 *
 * This class only has one use case or purpose and
 * all business logic relating to the use case should only be written here.
 */
export class GetBreeds {
  /**
   * Constructor
   *
   * @param catsBreedRepository which is an instance that implements CatsBreedRepositoryContract
   */
  constructor(private catsBreedRepository: CatsBreedRepositoryContract) {}

  /**
   * Retrieves all breeds.
   *
   * @returns Promise<Breed[]> which is promise that resolves to an array of breed.
   */
  getBreeds(): Promise<Breed[]> {
    return this.catsBreedRepository.getBreeds();
  }
}

// due to limitation of react somehow it won't allow implementation of
// some injection container library for dependency injection
// we will just to manually inject the data layer repository here and the data source
const catsBreedRepository = new CatsBreedRepository(
  new CatsBreedRemoteDataSource()
);

// now create the use case instance and export the instance
const instance = new GetBreeds(catsBreedRepository);
export default instance;
