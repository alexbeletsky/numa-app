import React from 'react';

import { Box } from '@chakra-ui/react';

export function Layout({ children }) {
  return (
    <Box minH="100vh" bg="gray.100">
      <Box p={6}>{children}</Box>
    </Box>
  );
}
