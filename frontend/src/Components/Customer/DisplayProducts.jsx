import { Box, Container, Flex, Link, space, Spacer } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import Product from '../partials/Product'
import { API } from "../../API/api_url";



export default function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const fetchAllProducts = async () => {
    // console.log("Fating all data");
    const response = await axios.get(`${API}/api/getproducts`);
    if (response.data.statusCode === 200) {
      setProducts(response.data.products);
      console.log(response.data.products);
    } else {
      alert("Not able to fetch all products");
    }
  }
  useEffect(() => {
    fetchAllProducts();
    console.log(products)
  }, [])


  return (
    <>
      <Flex justifyContent={'space-around'} alignContent={'space-between'} wrap={'wrap'}>
        {
          products.length > 0 ? products.map((value, index) => (
            <Box key={index}>
              <Link href={`/product/${value.shop_id}/${value._id}`}>
                <Product
                  name={value.name}
                  imageURL={value.image ? process.env.PUBLIC_URL + `/upload/images/${value.image.imgId}` : ""}
                  price={value.price}
                  description={value.description}
                />
              </Link>
            </Box>
          ))
            : <h3>No products found</h3>
        }


      </Flex>
    </>
  )
}