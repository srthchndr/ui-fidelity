import { InputProps, InputType } from '../../types/inputProps';

function InputComponent({className='', error=false, handleChange, helperText, id='', label='', name='', type=InputType.Text, value}: InputProps) {
  return (
        type === 'textarea' 
        ?
        (
            <div className={`${className}`}>
                <label>
                    <span className={`${error ? 'text-red-500' : 'text-black'} peer-focus:text-black block mb-1 text-left text-xs group-focus:text-black`}>{label}</span>
                    <textarea rows={3} className={`w-full rounded-sm px-2 py-1 text-sm border outline-0 ${error ? 'border-red-500 focus:border-red-500' : 'border-black/30 focus:border-black'}`} id={id} name={name} value={value} onChange={handleChange} /> 
                    {error && <p className='text-xs mt-1 text-left text-red-500'>{helperText}</p>}
                </label>
            </div>
        )
        : 
        (
            <div className={`${className}`}>
                <label className='block'>
                    <span className={`${error ? 'text-red-500' : 'text-black'} peer-focus:text-black block mb-1 text-left text-xs group-focus:text-black`}>{label}</span>
                    <input className={`rounded-sm px-2 py-1 text-sm border outline-0 ${error ? 'border-red-500 focus:border-red-500' : 'border-black/30 focus:border-black'}`} type={type} id={id} name={name} value={value} onChange={handleChange} />
                    {error && <p className='text-xs mt-1 text-left text-red-500'>{helperText}</p>}
                </label>
            </div>
        )
  );
}

export default InputComponent;
