import {render, screen, fireEvent, queryByText, getAllByRole} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';
import { ButtonVariant } from '../../types/buttonProps';

test('Renders primary button correctly with onClick', async () => {
    const btnClick = jest.fn();
    render(<Button variant={ButtonVariant.Primary} handleClick={btnClick}>Primary Button</Button>)

    const [button] = screen.getAllByRole('button');

    expect(button).toHaveTextContent('Primary Button');
    fireEvent.click(button);
    expect(btnClick).toHaveBeenCalledTimes(1);
})

test('Renders secondary button correctly with onClick', async () => {
    const btnClick = jest.fn();
    render(<Button variant={ButtonVariant.Secondary} handleClick={btnClick}>Secondary button</Button>)

    const [button] = screen.getAllByRole('button');

    expect(button).toHaveTextContent('Secondary button');
    fireEvent.click(button);
    expect(btnClick).toHaveBeenCalledTimes(1);
})

test('Renders text button correctly with onClick', async () => {
    const btnClick = jest.fn();
    render(<Button variant={ButtonVariant.Text} handleClick={btnClick}>Text Button</Button>)

    const [button] = screen.getAllByRole('button');

    expect(button).toHaveTextContent('Text Button');
    fireEvent.click(button);
    expect(btnClick).toHaveBeenCalledTimes(1);
})

test('Renders anchor link correctly', async () => {
    render(<Button href={'/'}>anchor link</Button>)

    const anchor = screen.getByText('anchor link');
    expect(anchor).toHaveAttribute('href', '/');
})

