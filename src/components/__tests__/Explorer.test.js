import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { render } from '../../test-utils'
import { fetch } from "../../fetch"
import Explorer from '../Explorer'
import { Route } from 'react-router-dom'

test('should not render anything', () => {
  render(<Route path='/search/:name'><Explorer /></Route>, '/search')

  expect(screen.queryByText('No Employee found')).not.toBeInTheDocument()
})

test('should render employee list', async () => {
  fetch.get.mockResolvedValue(['employee'])

  render(
    <Route path='/search/:name'>
      <Explorer />
    </Route>,
    '/search/John Doe'
  )

  await waitFor(() => screen.getByText('John Doe'))

  expect(screen.getByText('employee')).toBeInTheDocument()
})
