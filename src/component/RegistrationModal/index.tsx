import React, { useState } from 'react';
import './style.css';
import LoginModal from "../LoginModal"

const RegistrationModal = ({ openReg, closeRegModal }) => {
  const [profName, setProfName] = useState('');
  const [profEmail, setProfEmail] = useState('');
  const [profPass, setProfPass] = useState('');

  if (!openReg) return null;

  return (
     <div className="modalsdafadsfcontainer" onClick={closeRegModal}>
      <div className="logindfsadsfmodal" onClick={(e) => e.stopPropagation()}>
        <h1>Реєстрація</h1>
        <div className='inputs'>
          <input
            type="text"
            placeholder='*Email'
            value={profName}
            onChange={(e) => setProfName(e.target.value)}
            />

          <input
            type="text"
            placeholder="*Ім`я"
            value={profEmail}
            onChange={(e) => setProfEmail(e.target.value)}
            />

        
            
          <input
            type="text"
            placeholder='*Пароль'
            value={profPass}
            onChange={(e) => setProfPass(e.target.value)}
           
          />
            
        </div>
        <div className='swich_button'>
        <button className='accept_button'>
          Підтвердити
        </button>

        <button className='reg_button'>Увійти</button>
        </div>
    </div>
        


      </div>
   
  );
};

export default RegistrationModal;