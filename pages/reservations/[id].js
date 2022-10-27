import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

import { defaults } from 'lodash';

import { withAuthRequest } from '@/lib/withAuthRequest';
import { useState } from 'react';

export default function ReservationPage({
  reservation: { id, billingAddress },
}) {
  const initFormValues = defaults(billingAddress, {
    firstName: '',
    lastName: '',
    addressLine1: '',
    city: '',
    countryCode: '',
  });

  const [formState, setFormState] = useState(initFormValues);

  const handleInputChange = (e) => {
    const updatedState = {
      ...formState,
      [e.target.id]: e.target.value,
    };

    setFormState(updatedState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billingAddress: { ...formState } }),
    });
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={6} mx={'auto'} minW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Reservation #{id}</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form id="billingAddress" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <VStack>
                <FormControl id="firstName">
                  <FormLabel>Firstname</FormLabel>
                  <Input
                    type="text"
                    placeholder="Max"
                    onChange={handleInputChange}
                    value={formState.firstname}
                  />
                </FormControl>
                <FormControl id="lastName">
                  <FormLabel>Lastname</FormLabel>
                  <Input
                    type="text"
                    placeholder="Mustermann"
                    onChange={handleInputChange}
                    value={formState.lastname}
                  />
                </FormControl>
                <FormControl id="addressLine1">
                  <FormLabel>Street and number</FormLabel>
                  <Input
                    type="text"
                    placeholder="Unter den Linden 1"
                    onChange={handleInputChange}
                    value={formState.addressLine1}
                  />
                </FormControl>
                <FormControl id="city">
                  <FormLabel>City</FormLabel>
                  <Input
                    type="city"
                    placeholder="Berlin"
                    onChange={handleInputChange}
                    value={formState.city}
                  />
                </FormControl>
                <FormControl id="countryCode">
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="countryCode"
                    placeholder="Germany"
                    onChange={handleInputChange}
                    value={formState.countryCode}
                  />
                </FormControl>
              </VStack>
              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id },
  } = context;

  const { results } = await withAuthRequest(`/api/reservations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (results.status === 404) {
    return { notFound: true };
  }

  const { data } = await results.json();

  return {
    props: { reservation: data },
  };
}
