import React from 'react';

import IMG_NOT_FOUND from '../../images/not-found.png';
import { FlexGrid } from '../styled';
import ShowCard from './ShowCard';

function ShowGrid({ data }) {
  return (
    <FlexGrid>
      {/* <img src={IMG_NOT_FOUND} alt="image_not_found" /> */}
      {data.map(({ show }) => {
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMG_NOT_FOUND}
            summary={show.summary}
          />
        );
      })}
    </FlexGrid>
  );
}

export default ShowGrid;
