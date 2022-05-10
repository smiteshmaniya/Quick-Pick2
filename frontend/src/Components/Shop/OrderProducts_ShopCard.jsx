import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'; import Product from '../partials/ProductCard'
import Cart_product_card from '../partials/Cart_product_card';
import { ArrowForwardIcon, TimeIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../API/api_url'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Heading,
    Avatar,
    Center,
    Box,
    Container,
    Divider,
    Button,
    Flex,
    Stack,
    Text,
    useColorModeValue,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
} from '@chakra-ui/react';

export default function OrderProducts_ShopCard(props) {



    const completeOrder = () => {
        const success = axios.put(`${API}/api/orderStatus/${props.orderId}`, {});
        
    }
    useEffect(() => { console.log('running...') }, [completeOrder])
    return (
        <Container maxW={'1000px'} bg={useColorModeValue('gray.100', 'gray.700')} my={5} p={3} borderRadius={'md'}>
            <Flex direction={'row'} justifyContent={'space-around'}>
                <Box>
                    {

                        props.product_details.length > 0 ? props.product_details.map((value, index) => (
                            <Box key={index}>

                                <Cart_product_card
                                    name={value.productId.name}
                                    imageURL={value.productId.image ? process.env.PUBLIC_URL + `/upload/images/${value.productId.image.imgId}` : ""}
                                    price={value.productId.price}
                                    description={value.productId.description}
                                    quantity={value.quantity}
                                    productLink={`/product/${value.productId.shop_id}/${value.productId._id}`}
                                    product_id={value.productId._id}
                                />

                            </Box>
                        ))
                            : <h3>No products found</h3>
                    }
                    {/* <Cart_product_card /> */}
                    {/* <Cart_product_card /> */}
                </Box>
                <Box mt={3} >
                    <Box bg={useColorModeValue('white', 'gray.900')} borderRadius={'lg'} maxWidth={'200px'} p={4} height={'auto'} boxShadow={'md'}>
                        <Flex direction={'row'} justifyContent={'space-between'} my={2}>
                            <Flex direction={'column'}>
                                {/* <Box mt={1}>
                                    <Text fontWeight={600} as='span'>Amount: </Text>
                                    <Text as='span'> {"2204"} </Text>
                                </Box> */}
                                <Box>
                                    <Text fontWeight={600} as='span'> Order Id: </Text>
                                    <Text as='span'> {props.orderId} </Text>
                                </Box>
                                <Box>
                                    <Text fontWeight={600} as='span'> Status: </Text>
                                    <Text as='span'> {props.order_status} </Text>
                                </Box>
                                <Box>
                                    <Text fontWeight={600} as='span'> Secure Code: </Text>
                                    <Text as='span'> {props.secure_code} </Text>
                                </Box>
                                <Box>
                                    <Text fontWeight={600} as='span'> Pickup Time: </Text>
                                    <Text as='span'> {props.pickup_time} </Text>
                                </Box>
                                <Box>
                                    <Text fontWeight={600} as='span'> Total amount: </Text>
                                    <Text as='span'> {props.amount} </Text>
                                </Box>
                            </Flex>
                        </Flex>
                        <Stack
                            mt={'1rem'}
                            direction={'row'}
                            padding={2}
                            justifyContent={'space-between'}
                            alignItems={'center'}>
                            {/* {props.order_status == 'success' ? */}

                            <Button
                                width={'110px'}
                                fontSize={'sm'}
                                rounded={'full'}
                                onClick={completeOrder}
                            >
                                {props.order_status == 'success' ? "Done" : "Completed"}
                            </Button>
                        </Stack>
                    </Box>


                </Box>
            </Flex>
        </Container>
    )
}