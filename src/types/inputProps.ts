export enum InputType{
    TextArea = 'textarea',
    Text = 'text',
    Date = 'date'
}

export interface InputProps {
    className?: string,
    error?: boolean,
    handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>, 
    helperText?: string
    id?: string, 
    label?: string,
    name?: string, 
    type?: InputType, 
    value: any
}