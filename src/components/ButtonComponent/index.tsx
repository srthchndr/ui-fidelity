// import './App.css';

import {ButtonProps, ButtonVariant} from "../../types/buttonProps";

function ButtonComponent({children, variant=ButtonVariant.Primary, handleClick, href='', className='', isDisabled=false, id=''}: ButtonProps) {
  return (
        href === ''
        ? 
            <button 
                data-variant={variant} 
                data-disabled={isDisabled}
                disabled={isDisabled} 
                onClick={handleClick}
                className={`${className} data-[disabled=true]:bg-gray-500 data-[disabled=true]:hover:bg-gray-500 duration-200 px-6 py-1 rounded-sm data-[variant=primary]:bg-black data-[variant=primary]:text-white data-[variant=primary]:hover:bg-black/90 data-[variant=primary]:border data-[variant=primary]:border-black data-[variant=secondary]:hover:bg-black data-[variant=secondary]:hover:text-white data-[variant=secondary]:border data-[variant=secondary]:border-black data-[variant=secondary]:bg-transparent data-[variant=secondary]:text-black data-[variant=text]:border-0 data-[variant=text]:bg-transparent data-[variant=text]:text-black data-[variant=text]:hover:text-black/90 data-[variant=text]:p-0 data-[variant=text]:font-bold`}
                id={id}
            >
                {children}
            </button>
        :
            <a 
                className={'no-underline text-black'}
                data-testid={'anchor'}
                href={href}
            >
                {children}
            </a>
  );
}

export default ButtonComponent;
