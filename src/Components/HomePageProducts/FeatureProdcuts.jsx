import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 10,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 10,
  },
};

const responsive2 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 10,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 10,
    },
  };

const FeatureProdcuts = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    let params = {
      store_url: "https://vivacommerce-b2b-demo-i9.mybigcommerce.com",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MTczIl0sImVhdCI6MTg4NTYzNTE3NiwiaWF0IjoxNzEwMjM4MjY1LCJpc3MiOiJCQyIsInNpZCI6MTAwMzExMTAyOCwic3ViIjoiMjN4Nmk2ang2eDZ4dTI0ZnIxcTVhOGY0eGVlOXd6MCIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ.gnG-gcJxJGUuhmhwsBAlkp_ei6dDelbsvcKtnKjd9J49Lzf8CLBc8xnOvKu7hpI6eJ5oRiLiVN2dmKCCtDzvow",
    };
    function getProductInfo(params) {
      const storeUrl = new URL(params.store_url);

      // Use the store's canonical URL which should always resolve
      const graphQLUrl = `${storeUrl.origin}/graphql`;

      // Set up GraphQL query
      const graphQLQuery = `
          query MyQuery {
            site {
              featuredProducts(first: 10) {
                edges {
                  node {
                    description
                    id
                    name
                    prices {
                      price {
                        value
                      }
                    }
                    images {
                      edges {
                        node {
                          urlOriginal
                        }
                      }
                    }
                  }
                }
              }
            }
          }`;

      // Fetch data from the GraphQL Storefront API
      return fetch(graphQLUrl, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
        },
        body: JSON.stringify({ query: graphQLQuery }),
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res.data?.site?.featuredProducts?.edges);
          console.log(res.data?.site);
          res.data;
        });
    }

    // Set up default params

    getProductInfo(params);
  }, []);

  return (
    <div>
      <div style={{ marginTop: "100px", marginBottom: "100px" }}>
        <h1>Collections in focus</h1>
        {data && (
          <Carousel
            responsive={responsive2}
            infinite={true}
            swipeable={false}
            draggable={false}
            autoPlay={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlaySpeed={4000}
          >
            {data.map((item, index) => (
              <div style={{ marginRight: "40px" }}>
              
                <div>
                  <div>
                    <img
                      style={{ height: "273px", width: "283px" }}
                      src={item?.node?.images?.edges[0]?.node?.urlOriginal}
                      alt=""
                    />
                  </div>
                  <span>
                    {item?.node?.name &&
                      item.node.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default FeatureProdcuts;
