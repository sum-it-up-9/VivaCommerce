import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const client = new ApolloClient({
      uri: 'https://api.bigcommerce.com/graphql',
      cache: new InMemoryCache(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcxMDIyNDg2MiwiaXNzIjoiQkMiLCJzaWQiOjEwMDMxMTEwMjgsInN1YiI6IjIzeDZpNmp4Nng2eHUyNGZyMXE1YThmNHhlZTl3ejAiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6Mn0.p8M8bytWTqPdM0-gxmhzien9_QdAFJlOwZ7B_aml3Af_B8n2DT-sP52Wn_Y2dc84Q6jaMoSr4LilQMIxUus8Uw'
      },
    });
    const fetchProduct = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query Product($productId: Int!) {
              site {
                product(productId: $productId) {
                  id
                  name
                  description
                  price {
                    value
                  }
                  # Add more fields as needed
                }
              }
            }
          `,
          variables: {
            productId: 224,
          },
        });
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
    return () => {
      client.stop();
    };
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price.value}</p>
      {/* Add more product details as needed */}
    </div>
  );
};
export default ProductDetails;




function getProductInfo(params) {
    const storeUrl = new URL(params.store_url);

    // Use the store's canonical URL which should always resolve
    const graphQLUrl = `${storeUrl.origin}/graphql`;

    // Set up GraphQL query
    const graphQLQuery = `
        query productListing {
            site {
                products {
                    pageInfo {
                        startCursor
                        endCursor
                        }
                    edges {
                        cursor
                        node {
                            id
                            entityId
                            name
                            sku
                            description
                            prices {
                                price {
                                    value
                                    currencyCode
                                }
                            }
                        }
                    }
                }
            }
        }`

    // Fetch data from the GraphQL Storefront API
    return fetch(graphQLUrl, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${params.token}`},
            body: JSON.stringify({ query: graphQLQuery}),
        })
        .then(res => res.json())
        .then(res => res.data);
    }

    // Set up default params
    let params = {
        store_url: 'https://vivacommerce-b2b-demo-i9.mybigcommerce.com',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOltdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTcxMDIyNDg2MiwiaXNzIjoiQkMiLCJzaWQiOjEwMDMxMTEwMjgsInN1YiI6IjIzeDZpNmp4Nng2eHUyNGZyMXE1YThmNHhlZTl3ejAiLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6Mn0.p8M8bytWTqPdM0-gxmhzien9_QdAFJlOwZ7B_aml3Af_B8n2DT-sP52Wn_Y2dc84Q6jaMoSr4LilQMIxUus8Uw'
    };