import CatsBreedRepositoryContract from '../repositories/CatsBreedRepositoryContract';
import Breed from '../entities/Breed';
import BreedImage from '../entities/BreedImage';

/**
 * The base use case class that should be extended by all use cases
 */
abstract class UseCase {
  /**
   * Constructor
   *
   * @param catsBreedRepository which is an instance that implements CatsBreedRepositoryContract
   */
  constructor(protected catsBreedRepository: CatsBreedRepositoryContract) {}

  /**
   * The generic execute function that every use case must implement
   *
   * @param args
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  abstract execute(...args: any): Promise<Breed[]> | Promise<Breed> | Promise<BreedImage> | Promise<BreedImage[]>;
}

export default UseCase;
