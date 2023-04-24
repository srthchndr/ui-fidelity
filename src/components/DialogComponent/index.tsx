import Dialog from '@mui/material/Dialog';
import DialogProps from '../../types/dialogProps';
import DialogTitle from '@mui/material/DialogTitle';

function DialogComponent({handleClose, open, title, children}: DialogProps) {
  return (
    <Dialog className='' onClose={handleClose} open={open}>
        <DialogTitle className='bg-black text-white/80'>{title}</DialogTitle>
        {children}
    </Dialog>
  );
}

export default DialogComponent;
