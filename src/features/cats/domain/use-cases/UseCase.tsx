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
  abstract execute(...args: any): Promise<Breed[]> | Promise<Breed> | Promise<BreedImage[]>;
}

export default UseCase;
