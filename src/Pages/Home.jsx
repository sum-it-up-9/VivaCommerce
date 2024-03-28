import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useState, useEffect } from "react";
import Navbar from "../Components/NavBar/Navbar";
import { Box, Typography } from "@mui/material";
import { bannerData, bannerData2, bannerData3,bannerData4 } from "../constants/data";
import styled from "@emotion/styled";
import { navData } from "../constants/data";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import * as React from "react";
import FeatureProdcuts from "../Components/HomePageProducts/FeatureProdcuts";
import NewestProducts from "../Components/HomePageProducts/NewestProducts";
import BestSellingProducts from "../Components/HomePageProducts/BestSellingProducts";

const Image = styled("img")`
  width: 100%;

  height: 488px;
`;

const Container = styled(Box)`
  display: flex;

  justify-content: space-between;
`;

const ItemConatiner = styled(Box)`
  padding: 12px 0px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
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
    items: 6,
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


const responsive3 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items:1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const token=import.meta.env.VITE_TOKEN
const store_url=import.meta.env.VITE_STORE_URL



function Home() {
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
          category(entityId: 132) {
            description
            id
            name
            path
            products {
              edges {
                node {
                  entityId
                  description
                  name
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
         
          console.log(res,'category data');
          res.data;
        });
    }

    // Set up default params

    getProductInfo(params);
  }, []);


  useEffect(() => {
    let params = {
      store_url: "https://store-eagnf01idv-1557198.mybigcommerce.com",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjE1NTcxOTgsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MTczIl0sImVhdCI6MjAwMDAwMDAwMCwiaWF0IjoxNzExMDg1NzIzLCJpc3MiOiJCQyIsInNpZCI6MTAwMzExMTAyOCwic3ViIjoiMjN4Nmk2ang2eDZ4dTI0ZnIxcTVhOGY0eGVlOXd6MCIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ.fh9MzGnq7YcGTzlfKNtR__j6p6zFo3Eh3XdQmbbaApa_R6o5qiYdaJVEzTBTsFpPg3GKl0tekaPKeD7qLQuV7A",
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
          setData(res.data?.site?.category?.products);
          //console.log(res.data?.site);
          res.data;
        });
    }

    // Set up default params

    getProductInfo(params);
  }, []);



  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(54, 67, 186)",
          height: "50px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          id="text-message"
          className="text-14 md:text-16 font-normal"
          style={{ color: "rgb(255, 255, 255)",letterSpacing:'1.2px' }}
        >
         Enjoy ₹200/- Off on your first purchase.T&C apply{" "}
        </div>
      </div>
     
     
      {/* <Navbar/> */}


      <div  style={{ marginTop: "20px",marginLeft:'10vw',marginRight:'8vw' }}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Shop products" />
              <Tab value="two" label="Shop by rooms" />
              <Tab value="three" label="offers" />
              <Tab value="four" label="Viva for Business" />
              <Tab value="five" label="Customer Service" />
              <Tab value="six" label="Tips,Idea & trends" />
              <Tab value="seven" label="More" />
            </Tabs>
          </Box>
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          

          <Carousel
            responsive={responsive2}
            infinite={true}
            swipeable={true}
            draggable={false}
            autoPlay={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlaySpeed={4000}
          >
            {navData.map((data,index) => (
              <div 
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={data.url}
                  alt="nav"
                  style={{ width: 120, height: 65,borderRadius:'5px' }}
                />
                <h3>Bikes</h3>
              </div>
            ))}
          </Carousel>
        </div>
        </div>

        <div style={{marginTop:'20px'}}>
          
      <Carousel
            responsive={responsive3}
            infinite={true}
            swipeable={true}
            draggable={false}
            autoPlay={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlaySpeed={4000}
          >
            {bannerData4.map((data,index) => (
              <Image key={index} src={data.url} style={{height:'290px'}} />
            ))}
          </Carousel>
      </div>

      <div className="app-container">
       
       
       

      
        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
          <h2 style={{ paddingLeft: "8px", paddingBottom: "10px" }}>
            Collections in focus
          </h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            swipeable={false}
            draggable={false}
            autoPlay={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlaySpeed={4000}
          >
            {bannerData.map((data,index) => (
              <div key={index} style={{ margin: "0 10px" }}>
                {" "}
                {/* Adjust margin as needed */}
                <Image
                  src={data.url}
                  style={{ borderRadius: "15px", height: "460px" }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <FeatureProdcuts />
        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
          <h2 style={{ paddingLeft: "8px", paddingBottom: "10px" }}>
            Collections in focus
          </h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            swipeable={false}
            draggable={false}
            autoPlay={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlaySpeed={4000}
          >
            {bannerData3.map((data,index) => (
              <div  key={index} style={{ margin: "0 10px" }}>
                {" "}
                {/* Adjust margin as needed */}
                <Image src={data.url} style={{ borderRadius: "15px" }} />
              </div>
            ))}
          </Carousel>
        </div>
        <NewestProducts />
        <div style={{ marginTop: "100px", marginBottom: "100px" }}>
          <h2 style={{ paddingLeft: "8px", paddingBottom: "10px" }}>
            Collections in focus
          </h2>
          <Carousel
            responsive={responsive}
            infinite={true}
            swipeable={false}
            draggable={false}
            autoPlay={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlaySpeed={4000}
          >
            {bannerData2.map((data,index) => (
              <div   key={index} style={{ margin: "0 10px" }}>
                {" "}
                {/* Adjust margin as needed */}
                <Image src={data.url} style={{ borderRadius: "15px" }} />
              </div>
            ))}
          </Carousel>
        </div>
        <BestSellingProducts />
      </div>
    </div>
  );
}

export default Home;
