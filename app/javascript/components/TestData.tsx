import { gql, useQuery } from '@apollo/client';
import React from 'react';

interface Product {
  node: {
    id: number;
    title: string;
  }
}
interface ProductData {
  products: {
    edges: Product[]
  }
}

const TEST_QUERY = gql`
  {
    products (first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

type TestDataFunction = {
  // products: Array<{}>;
}

const TestData = () => {
  const { loading, error, data } = useQuery<ProductData>(TEST_QUERY);
  if (loading) {
    return (
      <div>Loading </div>
    );
  } else if (error) {
    return (
      <div>Something went wrong! </div>
    );
  } else {
    return (
      <>
        {data && data.products.edges.map(prod => {
          return (
            <p>{prod.node.title}</p>
          )
        })}
      </>
    );
  }
};

export default TestData;
