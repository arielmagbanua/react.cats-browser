import React, { useEffect, useState } from 'react';
import { isEqual, sortBy, differenceWith } from 'lodash';
import { Row } from 'react-bootstrap';

import { getBreedImages } from '../../domain/use-cases/CatBreedsUseCases';
import Breed from '../../data/models/Breed';
import BreedImage from '../../data/models/BreedImage';
import CatCard from './CatCard';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { useHasNetworkErrorHappenedContext } from '../providers/BreedsProvider';

interface IProps {
  breed: Breed | undefined | null,
  preSelectedBreed: Breed | undefined | null,
  page: number,
  setLoadMoreVisibility: (val: boolean) => void
}

/**
 * Cat card list component.
 * This component display the cat card images for the currently selected breed.
 *
 * @param breed The selected breed.
 * @param page The current page that is being loaded.
 * @param setLoadMoreVisibility The reference of the callback for controlling the visibility of the load more button.
 */
const CatCardList: React.FC<IProps> = ({ breed, preSelectedBreed, page, setLoadMoreVisibility }) => {
  // local state for handling breed images per selected breed
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);

  // local state for detecting changes in the current selected breed
  const [prevBreed, setPrevBreed] = useState<Breed | undefined | null>(null);

  const [networkHappened, setNetworkHappened] = useHasNetworkErrorHappenedContext();

  const sameBreedImageList = (previous: BreedImage[], current: BreedImage[]) => {
    // compare the array, return true regardless of the order as long as
    // both array have same values
    return isEqual(sortBy(previous), sortBy(current));
  }

  useEffect(() => {
    const selectedBreed = breed ?? preSelectedBreed;

    if (selectedBreed) {
      // const breedsDataSource = new CatsBreedRemoteDataSource();
      getBreedImages.execute(selectedBreed.id, page)
        .then((newImages: BreedImage[]) => {
          setNetworkHappened && setNetworkHappened(false);

          if (!isEqual(breed, prevBreed)) {
            // this means the breed was switched and we have to set the new set of images
            setBreedImages(newImages);
            // replace the previous with the new one
            setPrevBreed(breed);
            return;
          }

          if(sameBreedImageList(breedImages, newImages)){
            // same list therefore no more new breed images
            // therefore hide now the load more button
            setLoadMoreVisibility(false);
            return;
          }

          // there are new breed images to add to the original list
          const newUniqueImages = differenceWith(newImages, breedImages, isEqual);
          // now append the new unique images
          const updatedImages = [...breedImages].concat(newUniqueImages);
          setBreedImages(updatedImages);

          if (newUniqueImages.length === 0) {
            // no more new cat breed images therefore hide now the load more button
            setLoadMoreVisibility(false);
          }
        })
        .catch(() => {
          // something went wrong show the modal
          setNetworkHappened && setNetworkHappened(true);
        });
    } else {
      // no selected breed, therefore clear the image cards and hide the load more button
      setBreedImages([]);
    }
  }, [breed, page, preSelectedBreed]);

  // render the correct component template
  const renderComponentTemplate = (breedImages: BreedImage[]) => {
    if (breedImages.length === 0) {
      return (
        <Row>
          <p>No cats available.</p>
        </Row>
      );
    }

    return breedImages.map((breedImage: BreedImage) => (
      <CatCard
        key={breedImage.id}
        id={breedImage.id}
        imageUrl={breedImage.url}
      />
    ));
  }

  const renderErrorMessage = () => {
    return <ErrorMessage
      title="Network Error"
      message="Apologies but we could not load new cats for you at this time! Meow!"
    />;
  }

  return (
    <>
      {
        networkHappened ? renderErrorMessage() : renderComponentTemplate(breedImages)
      }
    </>
  );
}

export default CatCardList;
