import React, { useState } from 'react';
import './App.css';
import Header from './component/Header';
import Sections from './component/Sections';
import { SectionsProvider } from './component/SectionProvider';
import UserListModal from './component/UserListModal';



function App() {
const [open, setOpen] = useState(false);
const [users, setUsers] = useState([
  { id: 1, name: 'Freddy Adamson', status: 'User' },
  { id: 2, name: 'Siver Maxim', status: 'Admin' },
  { id: 3, name: 'Nicky Johnson', status: 'User' },
]);

const closeModal = () => {
  setOpen(false);
};

const updateUserStatus = (updatedUsers) => {
  setUsers(updatedUsers);
};



  return (
    <div className='container'>
       <button onClick={() => setOpen(true)}>Показати список користувачів</button>
      <UserListModal
        open={open}
        closeModal={closeModal}
        users={users}
        updateUserStatus={updateUserStatus}
      />
      <SectionsProvider>
      <Header />
      <Sections />
      </SectionsProvider>
    </div>
   
  );
}

export default App;