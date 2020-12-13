import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const AllProviders = ({ children }) => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </ChakraProvider>
);

const customRender = (ui, route = '/', options) => {
  window.history.pushState({}, 'Title', route)

  return render(ui, { wrapper: AllProviders, ...options });
}

export { customRender as render };
