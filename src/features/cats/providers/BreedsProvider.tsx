import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Breed from '../data/models/Breed';
import CatsBreedRemoteDataSource from '../data/sources/CatsBreedRemoteDataSource';

// Contexts
export const BreedsContext = React.createContext<Breed[]>([]);
export const SetSelectedBreedContext = React.createContext<Dispatch<SetStateAction<Breed | undefined>> | null>(null);
export const SelectedBreedContext = React.createContext<Breed | undefined | null>(null);

const BreedsProvider = (props: any) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | undefined>();

  useEffect(() => {
    if (breeds.length === 0) {
      // no breeds yet so fetch it
      const breedsDataSource = new CatsBreedRemoteDataSource();
      breedsDataSource.getBreeds()
        .then((breeds: Breed[]) => {
          setBreeds(breeds);
        });
    }
  },[breeds]);

  return (
    <BreedsContext.Provider value={breeds}>
      <SetSelectedBreedContext.Provider value={setSelectedBreed}>
        <SelectedBreedContext.Provider value={selectedBreed}>
          { props.children }
        </SelectedBreedContext.Provider>
      </SetSelectedBreedContext.Provider>
    </BreedsContext.Provider>
  );
}

export default BreedsProvider;
