// import './App.css';
import ButtonComponent from "../../components/ButtonComponent";
import CardComponent from "../../components/CardComponent";
import {ButtonVariant} from "../../types/buttonProps";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store';
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from './employeeReducer';
import Dialog from "../../components/DialogComponent";
import InputComponent from "../../components/InputComponent";
import { InputType } from "../../types/inputProps";

function MainView() {
  const {employees} = useSelector((state: RootState) => {console.log(state, "This is state"); return state.details});
  const dispatch = useDispatch<AppDispatch>();

  const [updatedDetails, setUpdatedDetails] = useState(employees);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getEmployees()).then((res) => {
      setUpdatedDetails(employees);
    });
    setUpdatedDetails(employees);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    setUpdatedDetails(employees);
  }, [employees]);

  const openDialog = () => {
    setIsOpen(true);
  }

  const updateInputFields = (event: {name: string, value: any}, id:string) => {
    const {name, value} = event;
    const updateEmployees = updatedDetails.map((employee) => {
      if(employee._id === id) {
        const updatedEmployee = {...employee, [name]: value}
        return updatedEmployee;
      }
      return employee;
    })
    
    setUpdatedDetails(updateEmployees);
    // dispatch(updateState(updateEmployees));
  }

  const deleteEmployeeRecord = (id: string) => {
    dispatch(deleteEmployee(id)).then(({payload}) => {
      setUpdatedDetails(updatedDetails.filter(employee => employee._id !== payload._id));
    });
  }

  const saveEmployee = (id: string, setEditState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const updatedEmployee = updatedDetails.find((employee) => id === employee._id);

    if(updatedEmployee) {
      dispatch(updateEmployee(updatedEmployee)).then(() => {
        setUpdatedDetails(updatedDetails.map(employee => {
          if(employee._id === updatedEmployee._id) {
            return updatedEmployee
          }
          return employee;
        }));
        setEditState(false);
      })
    }
  }  

  const cancelEdit = (setEditState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setUpdatedDetails(employees);
    setEditState(false);
  }

  const NewEmployeeComponent = () => {
    const [newEmployee, setNewEmployee] = useState({name: '', description: '', dob: new Date()});
    const dispatch = useDispatch<AppDispatch>();

    const closeDialog = () => {
      setIsOpen(false);

    }

    const handleNewEmployeeInputs = (event:any) => {
      const {target: {value, name}} = event;

      setNewEmployee({...newEmployee, [name]: value});
    }

    const addNewEmployee = () => {
      dispatch(addEmployee(newEmployee)).then(() => {
        setNewEmployee({name: '', description: '', dob: new Date()});
        closeDialog();
      });
    }

    const cancelOperation = () => {
      setNewEmployee({name: '', description: '', dob: new Date()});
      closeDialog();
    }

    return (
      <Dialog handleClose={closeDialog} open={isOpen} title={"Add New Employee"}>
        <div className="px-6 py-4 space-y-2">
            <InputComponent label="Name" handleChange={handleNewEmployeeInputs} name={'name'} value={newEmployee.name}/>
            <InputComponent label="DOB" handleChange={handleNewEmployeeInputs} name={'dob'} value={newEmployee.dob} type={InputType.Date}/>
          <InputComponent label="Description" handleChange={handleNewEmployeeInputs} name={'description'} value={newEmployee.description} type={InputType.TextArea}/>
          <div className={'flex space-x-4'}>
            <ButtonComponent isDisabled={!(newEmployee.name && newEmployee.description && newEmployee.dob)} handleClick={addNewEmployee}>Add Employee</ButtonComponent>
            <ButtonComponent handleClick={cancelOperation} variant={ButtonVariant.Secondary}>Cancel Operation</ButtonComponent>
          </div>
        </div>

      </Dialog>

    )
  }

  return (
    <div className={'flex flex-col flex-shrink md:flex-row h-screen'}>
        <div className={'flex items-center bg-black p-5 h-fit md:h-full text-white/70 md:flex-1 md:overflow-hidden'}>
            <h1 className={'text-center text-2xl md:text-7xl'}>Employees List</h1>
        </div>
        <main className={'flex flex-col flex-1 overflow-scroll text-center space-y-4 p-5'}>
          <div className='w-full text-end'>
            <ButtonComponent className={'w-full md:w-fit md:text-end'} variant={ButtonVariant.Primary} handleClick={openDialog}>Add Employee</ButtonComponent>
          </div>
          <div className='flex flex-wrap space-y-4 w-full justify-center'>
            {updatedDetails.length > 0 && updatedDetails.map((employee) => {
              return <CardComponent className={'w-full'} key={employee._id} deleteEmployee={deleteEmployeeRecord} saveEmployee={saveEmployee} cancelEdit={cancelEdit} employee={{...employee}} handleChange={updateInputFields}/>
            })}
            {updatedDetails.length === 0 && (
              <div className="block">
                <h3 className="text-2xl text-gray-500 font-extrabold">No employees data to display</h3>
                <p className="text-md text-gray-500">Add new employee using button above</p>
              </div>
            )}
          </div>
            {NewEmployeeComponent()}
        </main>
    </div>
  );
}

export default MainView;
