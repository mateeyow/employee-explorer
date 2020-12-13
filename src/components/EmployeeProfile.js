import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'

const EmployeeProfile = ({ employee }) => {
  return (
    <Box
      border='1px'
      borderColor='gray.200'
      borderRadius={4}
      shadow='base'
      mb={4}
      py={4}
      px={8}
    >
      <HStack spacing='6'>
        <Avatar name={employee.name} />
        <Stack>
          <Heading fontSize='1.10rem' textTransform='capitalize'>{employee.name}</Heading>
          <Text color='gray.500' fontSize='0.8rem' textTransform='uppercase' fontWeight='bold'>{employee.title}</Text>
        </Stack>
      </HStack>
    </Box>
  )
}

EmployeeProfile.propTypes = {
  employee: PropTypes.object.isRequired
}

export default EmployeeProfile
