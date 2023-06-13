// export {}
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {fireEvent, screen, waitFor, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import MainView from '.';
import { renderWithProviders } from '../../utils/preloadedStore';
import { act } from 'react-dom/test-utils';

const mockResponseForAddingEmployee = {
  name: 'Peter Thiel',
  dob: '1987-05-02T00:00:00.000Z',
  description: 'Description about Peter Thiel',
  _id: '000'
}

const mockResponseForUpdatingEmployee = {
  _id: "123",
  name: "Test",
  description: "Testing",
  dob: "2023-05-04T00:00:00.000Z"
}

const mockResponseForDeletingEmployeeRecord = {
  _id: '123'
}

const mockRequestToGetEmployeesList = [
  {
      _id: '123',
      dob: '2023-05-01T00:00:00.000Z',
      lastUpdated: '2023-05-22T16:44:19.705Z',
      _v: 0,
      name: 'Oreo',
      description: 'Description of oreo'
  }
]

const server = setupServer(
  rest.get('http://localhost:3100/api/employees', (req, res, ctx) => {
    return res(ctx.json(mockRequestToGetEmployeesList))
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

test('Dialog working on clicking add employee button', async () => {
  renderWithProviders(<MainView />)

  const addEmployeeBtn = screen.getByText('Add Employee');

  fireEvent.click(addEmployeeBtn);

  expect(screen.getAllByText('Add New Employee').length).toBe(2);
})

test('Adding new employee', async () => {
  setupMockServerResponseForAddingNewEmployee();
  renderWithProviders(<MainView />)

  const addEmployeeBtn = screen.getByText('Add Employee');
  
  fireEvent.click(addEmployeeBtn);
  
  const nameInput = screen.getByLabelText('Name');
  const dobInput = screen.getByLabelText('DOB');
  const descriptionInput = screen.getByLabelText('Description');
  const addActionBtn = screen.getAllByText('Add New Employee')[1];

  enterValuesForAllInputs(nameInput, dobInput, descriptionInput);

  fireEvent.click(addActionBtn);

  const employeesList = await screen.findAllByRole('article');

  expect(employeesList.length).toBe(2);
})

test('Clicking editing and cancelling to see correct values', async () => {
  renderWithProviders(<MainView />)

  const employeeElement = await screen.findByRole('article');
  const [editDetailsBtn, cancelEditBtn] = within(employeeElement).getAllByRole('button');
  
  fireEvent.click(editDetailsBtn);
  
  const [nameInput, dobInput] = within(employeeElement).getAllByRole('textbox');
  const descriptionInput = screen.getByText('Description of oreo');
  console.log(descriptionInput, "This is textbox");
 
  enterValuesForAllInputs(nameInput, dobInput, descriptionInput);

  act(() => {fireEvent.click(cancelEditBtn)});

  const employeeName = await screen.findByRole('heading', {level: 3});

  expect(employeeName.textContent).toBe('Oreo');
})

test('Updating the employee data', async () => {
  setupMockServerResponseForUpdatingEmployee();
  renderWithProviders(<MainView />)

  const employeeElement = await screen.findByRole('article');
  const [editDetailsBtn] = within(employeeElement).getAllByRole('button');
  
  fireEvent.click(editDetailsBtn);
  
  const [nameInput] = within(employeeElement).getAllByRole('textbox');
  
  updateEmployeeName(nameInput);
  
  const updateBtn = screen.getByText('Update Details');
  fireEvent.click(updateBtn);

  const employeeName = await screen.findByRole('heading', {level: 3});

  expect(employeeName.textContent).toBe('Test');
})

test('Deleting the employee record', async () => {
  setupMockServerResponseForDeletingEmployeeRecord();
  renderWithProviders(<MainView />)

  const employeeElement = await screen.findAllByRole('article');
  const deleteBtn = within(employeeElement[0]).getByText('Delete Record');
  
  fireEvent.click(deleteBtn);

  const emptyListViewTitle = await waitFor(() => screen.findByText('No employees data to display'));
  
  expect(emptyListViewTitle).toBeInTheDocument();
})

const setupMockServerResponseForDeletingEmployeeRecord = () => {
  server.use(
    rest.delete('http://localhost:3100/api/employee/123', (req, res, ctx) => {
      return res(ctx.json(mockResponseForDeletingEmployeeRecord))
    })
  )
}

const setupMockServerResponseForAddingNewEmployee = () => {
  server.use(
    rest.post('http://localhost:3100/api/employee', (req, res, ctx) => {
      return res(ctx.json(mockResponseForAddingEmployee))
    })
  )
}

const setupMockServerResponseForUpdatingEmployee = () => {
  server.use(
    rest.put('http://localhost:3100/api/employee', (req, res, ctx) => {
      return res(ctx.json(mockResponseForUpdatingEmployee))
    })
  )
}

const updateEmployeeName = (nameInput: HTMLElement) => {
  fireEvent.change(nameInput, {target: {name: 'name', value: 'Test'}})
}

const enterValuesForAllInputs = (nameInput: HTMLElement, dobInput: HTMLElement, descriptionInput: HTMLElement) => {
  fireEvent.change(nameInput, {target: {name: 'name', value: 'Test'}})
  fireEvent.change(dobInput, {target: {name: 'dob', value: '1999-12-31'}})
  fireEvent.change(descriptionInput, {target: {name: 'description', value: 'Description for Test'}})
}
