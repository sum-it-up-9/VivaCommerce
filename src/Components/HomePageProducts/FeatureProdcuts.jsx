import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

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
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};
const token=import.meta.env.VITE_TOKEN
const store_url=import.meta.env.VITE_STORE_URL

const FeatureProdcuts = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    let params = {
      store_url: store_url,
      token:token,
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
        <h2 style={{ paddingLeft: "40px" }}>Featured Products</h2>
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
              <Link
                key={index}
                to={`/product/${item.node.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div style={{ margin: "20px" }}>
                  <div>
                    <div
                      style={{
                        position: "relative",
                        border: "1px solid rgb(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                        margin: "0px 20px",
                        borderRadius:'12px'
                      }}
                    >
                      <img
                        style={{ height: "243px", width: "100%",borderRadius:'12px 12px 0 0' }}
                        src={item?.node?.images?.edges[0]?.node?.urlOriginal}
                        alt=""
                      />
                      <div
                        style={{
                          height: "243px",
                          width: "100%",
                          position: "absolute",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          borderRadius:'12px 12px 0 0'
                        }}
                      ></div>
                      <div style={{ marginBottom: "20px" }}>
                        <h3>
                          {item?.node?.name &&
                            item.node.name.split(" ").slice(0, 2).join(" ")}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default FeatureProdcuts;
