import http from 'axios';
import Breed from '../models/Breed';
import BreedImage from '../models/BreedImage';
import CatsBreedDataSourceContract from './CatsBreedDataSourceContract';

/**
 * The cat breed remote data source interface / contract for abstracting any data source for the breeds
 */
class CatsBreedRemoteDataSource implements CatsBreedDataSourceContract {
  /**
   * The base api url of the remote data source.
   */
  public static CAT_API_BASE_ENDPOINT_V1 = 'https://api.thecatapi.com/v1';

  /**
   * Retrieves all cat breeds.
   *
   * @returns Promise<Breed[]>
   */
  async getBreeds(): Promise<Breed[]> {
    const breeds = await http.get(CatsBreedRemoteDataSource.CAT_API_BASE_ENDPOINT_V1 + '/breeds');
    return breeds.data.map(this.resolveBreed);
  }

  /**
   * Retrieves a specific cat breed.
   *
   * @param id The id of the breed
   *
   * @returns Promise<Breed>
   */
  async getBreed(id: string): Promise<Breed> {
    const breed = await http.get(`${CatsBreedRemoteDataSource.CAT_API_BASE_ENDPOINT_V1}/breeds/search?q=${id}`);

    return this.resolveBreed(breed.data);

    // return {
    //   id: breed.data.id,
    //   name: breed.data.name,
    //   temperament: breed.data.temperament,
    //   description: breed.data.description,
    //   origin: breed.data.origin,
    //   referenceImageId: breed.data.reference_image_id
    // };
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
  async getBreedImages(id: string, page = 1, limit = 10): Promise<BreedImage[]> {
    const breedImages = await http.get(
      `${CatsBreedRemoteDataSource.CAT_API_BASE_ENDPOINT_V1}/images/search?page=${page}&limit=${limit}&breed_id=${id}`
    );

    return breedImages.data.map(this.resolveBreedImage);
  }

  /**
   * Resolve a breed data to Breed instance.
   *
   * @param breedData The raw breed data
   *
   * @returns Breed
   */
  protected resolveBreed(breedData: {
    id: string,
    name: string,
    temperament: string,
    description: string,
    origin: string,
    reference_image_id: string
  }): Breed {
    return {
      id: breedData.id,
      name: breedData.name,
      temperament: breedData.temperament,
      description: breedData.description,
      origin: breedData.origin,
      referenceImageId: breedData.reference_image_id
    }
  }

  /**
   * Resolve a breed image data to BreedImage instance.
   *
   * @param breedImageData The raw breed image data.
   *
   * @returns BreedImage
   */
  protected resolveBreedImage(breedImageData: {
    id: string,
    url: string,
    width: number,
    height: number,
    breeds?: []
  }): BreedImage {
    return {
      id: breedImageData.id,
      url: breedImageData.url,
      width: breedImageData.width,
      height: breedImageData.height,
      breeds: breedImageData.breeds
    }
  }

  /**
   * Retrieve a specific cat breed image.
   *
   * @param id The id of the image.
   *
   * @returns Promise<BreedImage>
   */
  async getBreedImage(id: string): Promise<BreedImage> {
    const breedImage = await http.get(`${CatsBreedRemoteDataSource.CAT_API_BASE_ENDPOINT_V1}/images/${id}`);
    const breeds: Breed[] = breedImage.data.breeds.map(this.resolveBreed);
    return this.resolveBreedImage({...breedImage.data, breeds: breeds});
  }
}

export default CatsBreedRemoteDataSource;
