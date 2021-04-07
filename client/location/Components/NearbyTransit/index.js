import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Item,
         Image,
         Description
        } from './styles';

const NearbyTransit = ({option, type}) => (
  <Item>
    <Image>
      <FontAwesomeIcon icon={type} size="lg"/>
    </Image>
    <Description>
      {option.name} {option.type}
    </Description>
  </Item>
);

export default NearbyTransit;


