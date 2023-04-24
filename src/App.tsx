import moment from 'moment';
import { useState } from 'react';
import ButtonComponent from './components/ButtonComponent';
import { ButtonVariant } from './types/buttonProps';
import CardComponent from './components/CardComponent';
import MainView from './views/MainView';

function App() {
  return (
    <div className={''}>
      <MainView/>
    </div>
  );
}

export default App;
