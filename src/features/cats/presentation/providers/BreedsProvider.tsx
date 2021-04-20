import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import Breed from '../../data/models/Breed';
import CatsBreedRemoteDataSource from '../../data/sources/CatsBreedRemoteDataSource';

// Contexts
export const BreedsContext = React.createContext<Breed[]>([]);
export const SetSelectedBreedContext = React.createContext<Dispatch<SetStateAction<Breed | undefined>> | null>(null);
export const SelectedBreedContext = React.createContext<Breed | undefined | null>(null);

// wrapper functions for using the BreedsContext
export const useBreedsContext = (): Breed[] => {
  return useContext<Breed[]>(BreedsContext);
};

// wrapper function for using the SetSelectedBreedContext
export const useSetSelectedBreedContext = (): Dispatch<SetStateAction<Breed | undefined>> | null => {
  return useContext<Dispatch<SetStateAction<Breed | undefined>> | null>(SetSelectedBreedContext);
}

// wrapper function for using the SelectedBreedContext
export const useSelectedBreedContext = (): Breed | undefined | null => {
  return useContext<Breed | undefined | null>(SelectedBreedContext);
}

// wrapper function for using both the SelectedBreedContext and the SetSelectedBreedContext
export const useCurrentSelectedBreed = (): [
    Breed | undefined | null,
    Dispatch<SetStateAction<Breed | undefined>> | null
] => {
  const l = useContext<Breed | undefined | null>(SelectedBreedContext);
  const r = useContext<Dispatch<SetStateAction<Breed | undefined>> | null>(SetSelectedBreedContext);
  return [l, r];
}

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
