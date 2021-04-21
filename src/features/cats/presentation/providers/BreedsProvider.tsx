import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

import Breed from '../../data/models/Breed';
import { getBreeds } from '../../domain/use-cases/CatBreedsUseCases';

// Contexts
export const BreedsContext = React.createContext<Breed[]>([]);
export const SetSelectedBreedContext = React.createContext<Dispatch<SetStateAction<Breed | undefined>> | null>(null);
export const SelectedBreedContext = React.createContext<Breed | undefined | null>(null);
export const NetworkErrorHappenedContext = React.createContext<boolean>(false);
export const SetNetworkErrorHappenedContext = React.createContext<Dispatch<SetStateAction<boolean>> | null>(null);

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

// wrapper function for using the NetworkErrorHappenedContext
export const useNetworkErrorHappenedContext = (): boolean => {
  return useContext<boolean>(NetworkErrorHappenedContext);
}

// wrapper function for using the SetNetworkErrorHappenedContext
export const useSetNetworkErrorHappenedContext = (): Dispatch<SetStateAction<boolean>> | null => {
  return useContext<Dispatch<SetStateAction<boolean>> | null>(SetNetworkErrorHappenedContext);
}

// wrapper function for using both the SelectedBreedContext and the SetSelectedBreedContext
export const useCurrentSelectedBreed = (): [
    Breed | undefined | null,
    Dispatch<SetStateAction<Breed | undefined>> | null
] => {
  const left = useContext<Breed | undefined | null>(SelectedBreedContext);
  const right = useContext<Dispatch<SetStateAction<Breed | undefined>> | null>(SetSelectedBreedContext);
  return [left, right];
}

// wrapper function for using both the NetworkErrorHappenedContext and SetNetworkErrorHappenedContext
export const useHasNetworkErrorHappenedContext = (): [boolean, Dispatch<SetStateAction<boolean>> | null] => {
  const left = useContext<boolean>(NetworkErrorHappenedContext);
  const right = useContext<Dispatch<SetStateAction<boolean>> | null>(SetNetworkErrorHappenedContext);
  return [left, right];
}

interface IProps {
  children: React.ReactNode
}

const BreedsProvider = ({ children }: IProps): JSX.Element => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | undefined>();
  const [networkHappened, setNetworkHappened] = useState<boolean>(false);

  useEffect(() => {
    if (breeds.length === 0) {
      // no breeds yet so fetch it
      getBreeds.execute()
        .then((breeds: Breed[]) => {
          setNetworkHappened(false);

          setBreeds(breeds);
        })
        .catch(() => {
          setNetworkHappened(true);
        });
    }
  },[breeds]);

  return (
    <BreedsContext.Provider value={breeds}>
      <SetSelectedBreedContext.Provider value={setSelectedBreed}>
        <SelectedBreedContext.Provider value={selectedBreed}>
          <SetNetworkErrorHappenedContext.Provider value={setNetworkHappened}>
            <NetworkErrorHappenedContext.Provider value={networkHappened}>
              { children }
            </NetworkErrorHappenedContext.Provider>
          </SetNetworkErrorHappenedContext.Provider>
        </SelectedBreedContext.Provider>
      </SetSelectedBreedContext.Provider>
    </BreedsContext.Provider>
  );
}

export default BreedsProvider;
