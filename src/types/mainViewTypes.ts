export interface ViewLayoutProps {
    children: React.ReactNode
}

export interface NewEmployeeDialogProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}