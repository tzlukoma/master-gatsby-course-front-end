import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SliceMasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SliceMasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;

  console.log(data);
  return (
    <SliceMasterGrid>
      {slicemasters.map((person) => (
        <SliceMasterStyles key={person.id}>
          <Link to={`/slicemaster/${person.slug.current}`}>
            <h2>
              <span className="mark">{person.name}</span>
            </h2>
          </Link>
          <Img fluid={person.image.asset.fluid} />
          <p className="description">{person.description}</p>
        </SliceMasterStyles>
      ))}
    </SliceMasterGrid>
  );
}

export const query = graphql`
  query PersonQuery {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
