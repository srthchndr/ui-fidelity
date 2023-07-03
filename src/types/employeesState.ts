export type EmployeeOptional = Partial<Employee>;

export interface Employee {
    _id?: string,
    name: string,
    description: string,
    dob: Date,
    lastUpdated?: Date
  }
  
export interface EmployeesState {
    employees: Employee[]
    errorMessage?: string
}