import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

export default function OrderPage({ data }) {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO title="Order a Pizza" />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="name">
            Email
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                alt={pizza.name}
                width="50"
                height="50"
                fluid={pizza.image.asset.fluid}
              />
              <h2>{pizza.name}</h2>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button key={size} type="button">
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
