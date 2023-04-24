import {render, screen, fireEvent, queryByText, getAllByRole} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '.';


test('Renders Card correctly', async () => {
    const employee = {name: 'Peter Thiel', dob: new Date('01/01/2001'), description: 'Description about Peter Thiel', lastUpdated: new Date('01/01/2021')}
    const editBtnClick = jest.fn();
    const deleteBtnClick = jest.fn();
    const saveBtnClick = jest.fn();
    const cancelBtnClick = jest.fn();
    const changeEvent = jest.fn();
    render(<Card employee={employee} saveEmployee={saveBtnClick} deleteEmployee={deleteBtnClick} cancelEdit={cancelBtnClick} handleChange={changeEvent}/>)

    const name = screen.getByTestId('name');
    const dob = screen.getByTestId('dob');
    const description = screen.getByTestId('description');
    const buttons = screen.getAllByRole('button');

    expect(name).toHaveTextContent('Peter Thiel');
    expect(dob).toHaveTextContent('1st January');
    expect(description).toHaveTextContent('Description about Peter Thiel');
    expect(buttons.length).toBe(2);    

    // expect(button).toHaveTextContent('Primary Button');
    // fireEvent.click(button);
    // expect(btnClick).toHaveBeenCalledTimes(1);
});

test('On Clicking Edit', async () => {
    const employee = {name: 'Peter Thiel', dob: new Date('01/01/2001'), description: 'Description about Peter Thiel', lastUpdated: new Date('01/01/2021')}
    const deleteBtnClick = jest.fn();
    const saveBtnClick = jest.fn();
    const cancelBtnClick = jest.fn();
    const changeEvent = jest.fn();
    render(<Card employee={employee} saveEmployee={saveBtnClick} deleteEmployee={deleteBtnClick} cancelEdit={cancelBtnClick} handleChange={changeEvent}/>)

    const [editBtn, deleteBtn] = screen.getAllByRole('button');

    fireEvent.click(deleteBtn);
    expect(deleteBtnClick).toBeCalledTimes(1);

    await userEvent.click(editBtn);
    const inputs = screen.queryAllByRole('textbox'); 
    expect(inputs[0]).toHaveAttribute('value', 'Peter Thiel');
    expect(inputs[1]).toHaveDisplayValue('Description about Peter Thiel')

    const [update, cancel] = screen.queryAllByRole('button');
    fireEvent.click(update);
    expect(saveBtnClick).toBeCalledTimes(1);
    fireEvent.click(cancel);
    expect(cancelBtnClick).toBeCalledTimes(1);
});
