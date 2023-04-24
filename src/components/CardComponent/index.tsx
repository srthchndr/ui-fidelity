import CakeIcon from '@mui/icons-material/Cake';
import moment from 'moment';
import { CardProps } from '../../types/cardProps';
import { useState } from 'react';
import ButtonComponent from '../ButtonComponent';
import { ButtonVariant } from '../../types/buttonProps';
import InputComponent from '../InputComponent';
import { InputType } from '../../types/inputProps';

function CardComponent({className, deleteEmployee, employee, saveEmployee, handleChange, cancelEdit}: CardProps) {
  const [onEditMode, setOnEditMode] = useState(false);
  return (
        <article className={`${className} border-[#c3c3c] box-content border-l-black border-l-8 border max-w-sm rounded-lg text-left bg-white px-5 py-4 text-gray-500/60 text-xs space-y-2`}>
            {!onEditMode ? 
            (<>
              <div data-testid={'readonly-card'} className={'flex flex-row w-full content-center space-x-4'}>
                <h3 data-testid={'name'} className={'flex-1 text-sm text-black font-semibold'}>{employee.name}</h3>
                <p data-testid={'dob'} className={'text-xs md:ml-auto leading-5'}><CakeIcon fontSize={'small'}/> {moment(employee.dob).format('Do MMMM')}</p>
              </div>
              <p data-testid={'description'} className={'line-clamp-2 text-black/60'}>{employee.description}</p>
              <p data-testid={'lastUpdated-1'} className={'uppercase text-xs'}>{moment(employee.lastUpdated).fromNow()}</p>
              <div className={'flex space-x-3'}>
                <ButtonComponent variant={ButtonVariant.Primary} handleClick={() => setOnEditMode(true)}>Edit Details</ButtonComponent>
                <ButtonComponent className={'data-[variant=secondary]:text-red-500 data-[variant=secondary]:border-red-500 data-[variant=secondary]:hover:bg-red-500 data-[variant=secondary]:hover:text-white'} variant={ButtonVariant.Secondary} handleClick={() => deleteEmployee(employee._id, setOnEditMode)}>Delete Record</ButtonComponent>
              </div>
              </>) 
            : 
            (
            <>
              <div data-testid={'editable-card'} className={'flex flex-col md:flex-row w-full content-center space-x-4'}>
                <InputComponent data-testid={'name-input'} className={'text-black'} handleChange={({target: {name, value}}) => handleChange({name, value}, employee._id)} name='name' label={'Name'} type={InputType.Text} value={employee.name} />
                <InputComponent data-testid={'dob-input'} className={'text-black'} handleChange={({target: {name, value}}) => handleChange({name, value}, employee._id)} name='dob' label={'dob'} type={InputType.Date} value={moment(employee.dob).format('YYYY-MM-DD')}/>
              </div>
              <InputComponent data-testid={'description-input'} className={'text-black'} handleChange={({target: {name, value}}) => handleChange({name, value}, employee._id)} name='description' label={'description'} type={InputType.TextArea} value={employee.description}/>
              <p data-testid={'lastUpdated-2'} className={'capitalize text-xs '}>Updated: {moment(employee.lastUpdated).fromNow()}</p>
              <div className={'flex space-x-3'}>
                <ButtonComponent data-testid={'save-btn'} variant={ButtonVariant.Primary} handleClick={() => saveEmployee(employee._id, setOnEditMode)}>Update Details</ButtonComponent>
                <ButtonComponent data-testid={'cancel-btn'} variant={ButtonVariant.Secondary} handleClick={() => cancelEdit(setOnEditMode)}>Cancel Edit</ButtonComponent>
              </div>
            </>)}
        </article>
  );
}

export default CardComponent;
