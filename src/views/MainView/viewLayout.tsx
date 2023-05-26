import { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { ButtonVariant } from "../../types/buttonProps";
import { ViewLayoutProps } from "../../types/mainViewTypes";
import NewEmployeeDialog from "./newEmployeeDialog";

const ViewLayout = ({children}: ViewLayoutProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
  
    const openDialog = () => {setIsDialogOpen(true)};
  
    return (
      <div className={'flex flex-col flex-shrink md:flex-row h-screen'}>
          <div className={'flex items-center bg-black p-5 h-fit md:h-full text-white/70 md:flex-1 md:overflow-hidden'}>
              <h1 className={'text-center text-2xl md:text-7xl'}>Employees List</h1>
          </div>
          <main className={'flex flex-col flex-1 overflow-scroll text-center space-y-4 p-5'}>
            <div className='w-full text-end'>
              <ButtonComponent data-testid={'addEmployeeBtn'} className={'w-full md:w-fit md:text-end'} variant={ButtonVariant.Primary} handleClick={openDialog}>Add Employee</ButtonComponent>
            </div>
            <div className='flex flex-wrap space-y-4 w-full justify-center'>
              {children}
            </div>
            <NewEmployeeDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
          </main>
      </div>
    )
}

export default ViewLayout;