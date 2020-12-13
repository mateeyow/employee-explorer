import React from 'react'
import { screen } from '@testing-library/react'
import { render } from '../../test-utils'
import EmployeeProfile from '../EmployeeProfile'

test('renders the correct text', () => {
  render(<EmployeeProfile employee={{ name: 'John Doe', title: 'CEO' }} />)
  
  expect(screen.getByText(/JD/)).toBeInTheDocument()
  expect(screen.getByText(/John Doe/)).toBeInTheDocument()
  expect(screen.getByText(/CEO/)).toBeInTheDocument()
})
