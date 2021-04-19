import React, { useEffect, useState } from 'react';
import { isEqual, sortBy, differenceWith } from 'lodash';

import BreedsRemoteDataSource from '../../data/sources/BreedsRemoteDataSource';
import Breed from '../../data/models/Breed';
import BreedImage from '../../data/models/BreedImage';
import CatCard from './CatCard';
import { Row } from "react-bootstrap";

interface IProps {
  breed: Breed | undefined | null,
  page: number,
  setLoadMoreVisibility: (val: boolean) => void
}

const CatCardList: React.FC<IProps> = ({ breed, page, setLoadMoreVisibility }) => {
  // local state for handling breed images per selected breed
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);

  // local breed state for detecting changes in the current selected breed
  const [prevBreed, setPrevBreed] = useState<Breed | undefined | null>(null);

  const sameBreedImageList = (previous: BreedImage[], current: BreedImage[]) => {
    // compare the array, return true regardless of the order as long as
    // both array have same values
    return isEqual(sortBy(previous), sortBy(current));
  }

  useEffect(() => {
    if (breed) {
      const breedsDataSource = new BreedsRemoteDataSource();
      breedsDataSource.getBreedImages(breed.id, page)
        .then((newImages: BreedImage[]) => {
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
        });
    } else {
      // no selected breed, therefore clear the image cards and hide the load more button
      setBreedImages([]);
    }
  }, [breed, page]);

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

  return (
    <>
      {
        renderComponentTemplate(breedImages)
      }
    </>
  );
}

export default CatCardList;
