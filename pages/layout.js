import React from 'react';

import { Image, Box } from '@chakra-ui/react';

export function Layout({ children }) {
  return (
    <Box minH="100vh" bg="gray.100">
      <Image src="/numa.svg" height={10} pt={4} pb={2} pl={2} />
      <Box p={2}>{children}</Box>
    </Box>
  );
}
