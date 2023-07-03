// import './App.css';
import CardComponent from "../../components/CardComponent";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { deleteEmployee, getEmployees, updateEmployee, updateState } from './employeeReducer';
import { Employee } from "../../types/employeesState";
import EmptyListView from "./emptyListView";
import ViewLayout from "./viewLayout";

function MainView() {
  const {employees} = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch<AppDispatch>();

  const [originalEmployees, setOriginalEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    dispatch(getEmployees()).then((res) => {
      setOriginalEmployees(res.payload);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const updateInputFields = (event: {name: string, value: any}, id:string) => {
    const {name, value} = event;
    const updatedEmployeesList = employees.map(findAndUpdateEmployee);

    function findAndUpdateEmployee(employee: Employee) {
      if(employee._id === id) {
        const updatedEmployee = {...employee, [name]: value}
        return updatedEmployee;
      }
      return employee;
    }
    
    dispatch(updateState(updatedEmployeesList));
  }

  const deleteEmployeeRecord = (id: string) => {
    dispatch(deleteEmployee(id)).then(({payload}) => {
      dispatch(updateState(employees.filter(employee => employee._id !== payload._id)));
    });
  }

  const saveEmployee = (id: string, setEditState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const employeeWithChanges = employees.find((employee) => id === employee._id);

    if(employeeWithChanges) {
      dispatch(updateEmployee(employeeWithChanges)).then((res) => {
        if(res.type !== 'employee/updateEmployee/rejected')
          updateEmployeesListState();
      })
    }

    function updateEmployeesListState() {
      dispatch(updateState(employees.map(employee => {
        if(employee._id === employeeWithChanges?._id) {
          return employeeWithChanges
        }
        return employee;
      })));
      setEditState(false);
    }
  }  

  const cancelEdit = (setEditState: React.Dispatch<React.SetStateAction<boolean>>) => {
    dispatch(updateState(originalEmployees));
    setEditState(false);
  }

  return (
    <ViewLayout>
      {employees.length > 0 && employees.map((employee) => {
        return <CardComponent className={'w-full'} key={employee._id} deleteEmployee={deleteEmployeeRecord} saveEmployee={saveEmployee} cancelEdit={cancelEdit} employee={{...employee}} handleChange={updateInputFields}/>
      })}
      {employees.length === 0 && (
        <EmptyListView/>
      )}
    </ViewLayout>
  );
}

export default MainView;
