import {render, screen, fireEvent, queryByText, getAllByRole} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputComponent from '.';
import { InputType } from '../../types/inputProps';


test('Renders Text Input correctly', async () => {
    const onChangeFunc = jest.fn();
    render(<InputComponent handleChange={onChangeFunc} name='textInp' value={'Textbox'}/>)

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue('Textbox');
});

test('Renders TextArea correctly', async () => {
    const onChangeFunc = jest.fn();
    render(<InputComponent handleChange={onChangeFunc} type={InputType.TextArea} name='textInp' value={'Textbox'}/>)

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveDisplayValue('Textbox');
});

test('Triggering inputs onChange event', async () => {
    const onChangeFunc = jest.fn();
    render(<InputComponent handleChange={onChangeFunc} type={InputType.TextArea} name='textInp' value={''}/>)

    const input = screen.getByRole('textbox');
    
    await userEvent.type(input, 't')
    expect(onChangeFunc).toBeCalledTimes(1);
})







