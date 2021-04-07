import styled from 'styled-components';

export const Wrapper = styled.div`
  #map {
    height: 320px;
    width: 100%;
    margin: 2rem 0;
  }

  .marker {
    width: 10px;
    height: 10px;
    background-color: #000;
    border: #000 4px solid;
    border-radius: 50%;
    opacity: 0.99;
  }

  .marker.nearby {
    background-color: transparent;
    border: blue 4px solid;
  }

  .building-link {
    line-height: 20px;
    height: 100%;
    width: 137.8px;
    color: blue;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    appearance: none;
    background: none;
    border: 0;
    padding: 0;
    outline: none;
  }

  .building-link:hover {
    text-decoration: underline
  }
`