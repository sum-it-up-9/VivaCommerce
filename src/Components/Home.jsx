

import  { useState, useEffect } from 'react';
import Navbar from './Navbar';


function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    let params = {
      store_url: 'https://vivacommerce-b2b-demo-i9.mybigcommerce.com',
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MTczIl0sImVhdCI6MTg4NTYzNTE3NiwiaWF0IjoxNzEwMjM4MjY1LCJpc3MiOiJCQyIsInNpZCI6MTAwMzExMTAyOCwic3ViIjoiMjN4Nmk2ang2eDZ4dTI0ZnIxcTVhOGY0eGVlOXd6MCIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ.gnG-gcJxJGUuhmhwsBAlkp_ei6dDelbsvcKtnKjd9J49Lzf8CLBc8xnOvKu7hpI6eJ5oRiLiVN2dmKCCtDzvow'
  };
    function getProductInfo(params) {
      const storeUrl = new URL(params.store_url);
  
      // Use the store's canonical URL which should always resolve
      const graphQLUrl = `${storeUrl.origin}/graphql`;
  
      // Set up GraphQL query
      const graphQLQuery = `
      query MyQuery {
        site {
          category(entityId: 23) {
            defaultImage {
              altText
              isDefault
              urlOriginal
            }
            description
            id
            name
            path
            products {
              edges {
                node {
                  name
                  minPurchaseQuantity
                  maxPurchaseQuantity
                  images {
                    edges {
                      node {
                        altText
                        isDefault
                        urlOriginal
                      }
                    }
                  }
                  sku
                  showCartAction
                  type
                  warranty
                  variants {
                    edges {
                      node {
                        sku
                        defaultImage {
                          isDefault
                          altText
                        }
                      }
                    }
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
          .then(res => {
            setData(res.data?.site?.category?.products);  
           console.log(res.data?.site);
            res.data
          }
            );
      }
  
      // Set up default params
    
      getProductInfo(params);
  }, []);

  return (
    <>
      <Navbar/>
      <div style={{display:'flex',flexWrap:'wrap',gap:60,padding:20}}> 
      {

        data && data.edges.map((item,index)=>{
          return (
            <div key={index} >
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div>
                        <img height={500} width={500} src={item?.node?.images?.edges[0]?.node?.urlOriginal} alt="" />
                    </div>
                    <h2>{item?.node?.name && item.node.name.split(' ').slice(0, 4).join(' ')}</h2>
                </div>
               
            </div>
          )
        })
      }
      </div>
    </>
  )
}

export default Home

