import { Slide, SlideProps, Snackbar } from '@mui/material';

import MainView from './views/MainView';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function App() {

  const [open, setOpen] = useState(false);
  const errorMessage = useSelector((state: RootState) => state.details.errorMessage);

  useEffect(() => {
    if(errorMessage !== '') {
      setOpen(true);
    }
  }, [errorMessage])

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className={''}>
        <MainView/>
        <Snackbar open={open} onClose={handleClose} TransitionComponent={TransitionRight} autoHideDuration={5000} message={errorMessage} anchorOrigin={{vertical: 'top', horizontal: 'left'}} />
    </div>
  );
}

export default App;
