import React from "react";

export enum ButtonVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Text = 'text'
}

export interface ButtonProps {
    children: React.ReactNode | string
    className?: string,
    handleClick?: React.MouseEventHandler<HTMLButtonElement>,
    href?: string,
    isDisabled?: boolean,
    variant?: ButtonVariant,
}