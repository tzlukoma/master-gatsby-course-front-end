import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: solid 1px var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    justify-items: center;
    font-size: 10px;
    color: black;
  }
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;

  console.log(beers);
  return (
    <>
      <h2 className="center">We have {beers.length} Beers Available</h2>
      <BeerGridStyles>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyles key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span>({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyles>
          );
        })}
      </BeerGridStyles>
      {/* <BeerList beers={beers} /> */}
    </>
  );
}

export const query = graphql`
  query BeerQuery {
    beers: allBeer {
      nodes {
        name
        price
        image
        rating {
          reviews
          average
        }
        remoteImage__NODE
      }
    }
  }
`;
