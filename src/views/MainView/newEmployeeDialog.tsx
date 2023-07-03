import { useDispatch } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import DialogComponent from "../../components/DialogComponent";
import InputComponent from "../../components/InputComponent";
import { ButtonVariant } from "../../types/buttonProps";
import { InputType } from "../../types/inputProps";
import { addEmployee } from "./employeeReducer";
import { AppDispatch } from "../../store";
import { useState } from "react";
import { NewEmployeeDialogProps } from "../../types/mainViewTypes";

const NewEmployeeDialog = ({isOpen, setIsOpen}: NewEmployeeDialogProps) => {
    const [newEmployee, setNewEmployee] = useState({name: '', description: '', dob: ''});
    const dispatch = useDispatch<AppDispatch>();
  
    const closeDialog = () => {
      setIsOpen(false);
  
    }
  
    const handleNewEmployeeInputs = (event:any) => {
      const {target: {value, name}} = event;
  
      setNewEmployee({...newEmployee, [name]: value});
    }
  
    const addNewEmployee = () => {
      dispatch(addEmployee({...newEmployee, dob: new Date(newEmployee.dob)})).then(() => {
        setNewEmployee({name: '', description: '', dob: ''});
        closeDialog();
      });
    }
  
    const cancelOperation = () => {
      setNewEmployee({name: '', description: '', dob: ''});
      closeDialog();
    }
  
    return (
      <DialogComponent handleClose={closeDialog} open={isOpen} title={"Add New Employee"}>
        <div className="px-6 py-4 space-y-2">
            <InputComponent data-testid={'name-input'} label="Name" handleChange={handleNewEmployeeInputs} name={'name'} value={newEmployee.name}/>
            <InputComponent data-testid={'dob-input'} label="DOB" handleChange={handleNewEmployeeInputs} name={'dob'} value={newEmployee.dob} type={InputType.Date}/>
          <InputComponent data-testid={'description-input'} label="Description" handleChange={handleNewEmployeeInputs} name={'description'} value={newEmployee.description} type={InputType.TextArea}/>
          <div className={'flex space-x-4'}>
            <ButtonComponent id={'newEmployeeBtn'} isDisabled={!(newEmployee.name && newEmployee.description && newEmployee.dob)} handleClick={addNewEmployee}>Add New Employee</ButtonComponent>
            <ButtonComponent data-testid={'cancel-btn'} handleClick={cancelOperation} variant={ButtonVariant.Secondary}>Cancel Operation</ButtonComponent>
          </div>
        </div>
      </DialogComponent>
    )
}

export default NewEmployeeDialog;