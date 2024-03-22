import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams,useNavigate } from 'react-router-dom';
import { Box, Typography,Button, styled,Grid,Table, TableBody, TableRow, TableCell, } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';

import RelatedProducts from './RelatedProducts/RelatedProducts';




const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;


const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

const LeftConatiner=styled(Box)`
  min-width:40%;
  padding:40px 0 0 80px;
`;

const Image=styled('img')({
  padding:'15px 20px',
  border:'1px solid #f0f0f0',
  width:'92%',
  
})


const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
    }
`

const StyledButton=styled(Button)`
    width:46%;
    height:50px;
    border-radius:5px;
    font-weight:bold;
`


const ProductDisplay = () => {
    const [productData, setData] = useState("");

    const id=useParams();

    console.log(id);


    function getProductInfo() {
        let params = {
            store_url: "https://vivacommerce-b2b-demo-i9.mybigcommerce.com",
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MTczIl0sImVhdCI6MTg4NTYzNTE3NiwiaWF0IjoxNzEwMjM4MjY1LCJpc3MiOiJCQyIsInNpZCI6MTAwMzExMTAyOCwic3ViIjoiMjN4Nmk2ang2eDZ4dTI0ZnIxcTVhOGY0eGVlOXd6MCIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ.gnG-gcJxJGUuhmhwsBAlkp_ei6dDelbsvcKtnKjd9J49Lzf8CLBc8xnOvKu7hpI6eJ5oRiLiVN2dmKCCtDzvow",
         };
        const storeUrl = new URL(params.store_url);
  
        // Use the store's canonical URL which should always resolve
        const graphQLUrl = `${storeUrl.origin}/graphql`;

     
  
        // Set up GraphQL query
        const graphQLQuery = `
        query MyQuery {
            site {
              product(id: "UHJvZHVjdDoxOTU=") {
                id
                name
                prices {
                  price {
                    value
                  }
                  bulkPricing {
                    maximumQuantity
                    minimumQuantity
                    ... on BulkPricingFixedPriceDiscount {
                      maximumQuantity
                      minimumQuantity
                      price
                    }
                    ... on BulkPricingPercentageDiscount {
                      maximumQuantity
                      minimumQuantity
                      percentOff
                    }
                  }
                }
                productOptions {
                  edges {
                    node {
                      displayName
                      entityId
                      isVariantOption
                    }
                  }
                  pageInfo {
                    startCursor
                    endCursor
                  }
                }
                relatedProducts {
                  edges {
                    node {
                      description
                      entityId
                      images {
                        edges {
                          node {
                            urlOriginal
                          }
                        }
                      }
                      name
                      prices {
                        price {
                          value
                        }
                      }
                    }
                  }
                }
                reviews {
                  edges {
                    node {
                      rating
                      entityId
                      text
                      title
                    }
                  }
                }
                images {
                  edges {
                    node {
                      urlOriginal
                    }
                  }
                }
                description
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
            setData(res.data?.site?.product);
            console.log(res.data?.site?.product);
            res.data;
          });
      }



    useEffect(()=>{
        getProductInfo();
    },[]);

  return (
    <>{
        productData && (
        <Grid container>
          {/* Left Container */}
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <LeftConatiner>
              <Box style={{marginBottom:10}}>
                <Image src={productData?.images?.edges[0]?.node?.urlOriginal}/>
              </Box>
              <StyledButton onClick={()=>{handleAddToCart(productData)}} variant="contained" style={{marginRight:10,background:'#3643ba'}} >Add to Cart</StyledButton>
              <StyledButton onClick={()=>{buyNow(productData)}} variant="contained" style={{background:'#000'}}>Buy Now</StyledButton>
            </LeftConatiner>
          </Grid>
  
          {/* Right Container */}
          <Grid item lg={8} md={8} sm={8} xs={12} style={{marginTop:55,paddingRight:20,paddingLeft:40}}>
            <Typography> <h1>{productData?.name}</h1></Typography>
            <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
              8 Ratings & 1 Reviews
            
            </Typography>
            <Typography>
              {/* <span style={{ fontSize: 28 }}>₹{productData?.price?.cost}</span>&nbsp;&nbsp;&nbsp;  */}
              <span style={{ color: '#878787' }}><strike>₹{productData?.prices?.price?.value}</strike></span>&nbsp;&nbsp;&nbsp;
              {/* <span style={{ color: '#388E3C' }}>{productData?.price?.discount} off</span> */}
            </Typography>
            <Typography><h3>Available offers</h3></Typography>
            <SmallText>
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quisquam ex aperiam cupiditate consequatur ratione assumenda ad blanditiis quam expedita laborum est, illum nobis nam fugiat animi? Nisi, iure odit!</Typography>
                    {/* <Typography><StyledBadge />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</Typography>
                    <Typography><StyledBadge />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</Typography>
                    <Typography><StyledBadge />Partner OfferExtra 10% off upto ₹500 on next furniture purchase</Typography> */}
            </SmallText>
            <Table style={{marginTop:30}}>
                  <TableBody>
                      <ColumnText>
                          <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                          <TableCell style={{ fontWeight: 600 }}>Delivery by 6-8 days | ₹40</TableCell>
                      </ColumnText>
                      <ColumnText>
                          <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                          <TableCell>No Warranty</TableCell>
                      </ColumnText>
                      <ColumnText>
                          <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                          <TableCell>
                              <span style={{ color: '#2874f0' }}>SuperComNet</span>
                              <Typography>GST invoice available</Typography>
                  
                          </TableCell>
                      </ColumnText>
              
                      <ColumnText>
                          <TableCell style={{ color: '#878787' }}>Description</TableCell>
                          <TableCell>{productData?.description}</TableCell>
                      </ColumnText>
                      
                  </TableBody>
              </Table>
          </Grid>
        </Grid>
        )
      }
      <div >
        <RelatedProducts/>
      </div>
         
      </>
  
  )
}

export default ProductDisplay

