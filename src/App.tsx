import React, { useState } from 'react';
import './App.css';
import Header from './component/Header';
import Sections from './component/Sections';
import { SectionsProvider } from './component/SectionProvider';
import UserListModal from './component/UserListModal';



function App() {

  return (
    <div className='container'>
      <SectionsProvider>
      <Header />
      <Sections />
      </SectionsProvider>
    </div>
   
  );
}

export default App;