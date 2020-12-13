import React, { useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  Input,
  HStack,
  theme,
} from '@chakra-ui/react';
import { Route, useHistory } from 'react-router-dom';
import Explorer from './components/Explorer';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const history = useHistory()
  const [,,currentName = ''] = window.location.pathname.split('/')
  const [searchTerm, setSearchTerm] = useState(decodeURI(currentName))
  const handleSubmit = (evt) => {
    evt.preventDefault()
    history.push(`/search/${encodeURI(searchTerm)}`)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box p='6' textAlign='center' mx='auto' width='min(70ch, 100%)'>
        <ColorModeSwitcher />
        <Heading as='h1' mb='6'>Employee Explorer</Heading>
        <Box mx='auto' as='form' onSubmit={handleSubmit}>
          <HStack>
            <Input
              placeholder='John Doe'
              autoFocus
              name='name'
              value={searchTerm}
              onChange={(evt) => setSearchTerm(evt.target.value)}
            />
            <Button colorScheme='teal' type='submit'>Search</Button>
          </HStack>
        </Box>
      </Box>
      <Route path='/search/:name'>
        <Explorer />
      </Route>
    </ChakraProvider>
  );
}

export default App;
