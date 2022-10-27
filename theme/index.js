import '@fontsource/roboto/400.css';
import '@fontsource/open-sans/700.css';

import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Roboto', sans-serif`,
};

export const theme = extendTheme({ config, fonts });
