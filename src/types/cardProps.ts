import { Employee } from "./employeesState";

export interface CardProps {
    cancelEdit: Function,
    className?: string,
    deleteEmployee: Function,
    employee: Employee,
    handleChange: Function,
    saveEmployee: Function
}