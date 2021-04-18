import http from 'axios';
import Breed from '../models/Breed';

export abstract class BreedRemoteDataSourceContract {
  abstract getBreeds(): Promise<Breed[]>;
  abstract getBreed(id: string): Promise<Breed>;
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
        origin: breedData.origin
      }
    })
  }

  async getBreed(id: string): Promise<Breed> {
    const breed = await http.get(`https://api.thecatapi.com/v1/breeds/search?q=${id}`);
    return {
      id: breed.data.id,
      name: breed.data.name,
      temperament: breed.data.temperament,
      description: breed.data.description,
      origin: breed.data.origin
    }
  }
}

export default BreedsRemoteDataSource;
