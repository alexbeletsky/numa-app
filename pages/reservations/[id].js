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

import { withAuthRequest } from '@/lib/withAuthRequest';

export default function ReservationPage({
  reservation: { id, billingAddress },
  accessToken,
}) {
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
          <Stack spacing={4}>
            <VStack>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" placeholder="Max Mustermann" />
              </FormControl>
              <FormControl id="address">
                <FormLabel>Street and number</FormLabel>
                <Input type="text" placeholder="Unter den Linden 1" />
              </FormControl>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="city" placeholder="Berlin" />
              </FormControl>
              <FormControl id="country">
                <FormLabel>Country</FormLabel>
                <Input type="country" placeholder="Germany" />
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
        </Box>
      </Stack>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { id },
  } = context;

  const { results, accessToken } = await withAuthRequest(
    `/api/reservations/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (results.status === 404) {
    return { notFound: true };
  }

  const { data } = await results.json();

  return {
    props: { reservation: data, accessToken },
  };
}
