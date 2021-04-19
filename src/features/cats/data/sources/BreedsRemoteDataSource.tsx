import http from 'axios';
import Breed from '../models/Breed';
import BreedImage from '../models/BreedImage';

export abstract class BreedRemoteDataSourceContract {
  abstract getBreeds(): Promise<Breed[]>;
  abstract getBreed(id: string): Promise<Breed>;
  abstract getBreedImages(id: string, page: number, limit: number): Promise<BreedImage[]>;
}

class BreedsRemoteDataSource implements BreedRemoteDataSourceContract {
  async getBreeds(): Promise<Breed[]> {
    const breeds = await http.get('https://api.thecatapi.com/v1/breeds');

    return breeds.data.map((breedData: any) => {
      return {
        id: breedData.id,
        name: breedData.name,
        temperament: breedData.temperament,
        description: breedData.description,
        origin: breedData.origin,
        referenceImageId: breedData.reference_image_id
      }
    });
  }

  async getBreed(id: string): Promise<Breed> {
    const breed = await http.get(`https://api.thecatapi.com/v1/breeds/search?q=${id}`);
    return {
      id: breed.data.id,
      name: breed.data.name,
      temperament: breed.data.temperament,
      description: breed.data.description,
      origin: breed.data.origin,
      referenceImageId: breed.data.reference_image_id
    };
  }

  async getBreedImages(id: string, page: number = 1, limit: number = 10): Promise<BreedImage[]> {
    const breedImages = await http.get(
      `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&breed_id=${id}`
    );

    return breedImages.data.map((breedImageData: any) => {
      return {
        id: breedImageData.id,
        url: breedImageData.url,
        width: breedImageData.width,
        height: breedImageData.height
      }
    });
  }
}

export default BreedsRemoteDataSource;
