// export {}
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import MainView from '.';
import { renderWithProviders } from '../../utils/preloadedStore';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get('http://localhost:3100/api/employees', (req, res, ctx) => {
    return res(ctx.json([
        {
            _id: '123',
            dob: '2023-05-01T00:00:00.000Z',
            lastUpdated: '2023-05-22T16:44:19.705Z',
            _v: 0,
            name: 'Oreo',
            description: 'Description of oreo'
        }
    ]))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('Loads and displays employees list', async () => {
    renderWithProviders(<MainView />)
  
    const employeesList = await screen.findAllByRole('article');
  
    expect(employeesList.length).toBe(1);
})

test('Displaying empty employees list', async () => {
  server.use(
    rest.get('http://localhost:3100/api/employees', (req, res, ctx) => {
      return res(ctx.json([]));
    })
  )

  renderWithProviders(<MainView />)

  const emptyListViewTitle = screen.getByText('No employees data to display');

  expect(emptyListViewTitle).toBeInTheDocument();
})


