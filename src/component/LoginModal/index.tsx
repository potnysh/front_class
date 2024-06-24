import React, { useState } from 'react';
import './style.css';
import RegistrationModal from "../RegistrationModal"
import { useSectionsContext } from '../SectionProvider';

const LogiModal = ({ openLogin, closeLoginModal }) => {
  const { signIn } = useSectionsContext();
  const [isRegister, setIsRegister] = useState(false)

  const closeModal = () => {
    setIsRegister(false)
    closeLoginModal()
  }
  

  if (!openLogin) return null;

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="login_modal" onClick={(e) => e.stopPropagation()}>
        {isRegister ? <RegisterForm setIsRegister={setIsRegister}/> : <LoginForm setIsRegister={setIsRegister} signIn={signIn} closeModal={closeModal}/>}
      </div>
    </div>
   
  );
};

const LoginForm = ({ setIsRegister, signIn, closeModal }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authData = {email, password}

  const handleLogin = () => {
    if(!email || !password) {
      alert("Всі поля є обов'язковими.");
      return;
    }

    signIn(authData)
    setEmail('')
    setPassword('')
    closeModal()
  }

  return (
  <>
    <h1>Увійти</h1>
    <div className='inputs'>
      <input
        type="text"
        placeholder='*Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder='*Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="swich_button">
    <button onClick={handleLogin} className='accept_button'>
      Підтвердити
    </button>
    <div>
      <button className='reg_button' onClick={() => setIsRegister(true)} >Реєстрація</button>
    </div>
    </div>
  </>
  )
}

const RegisterForm = ({ setIsRegister }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
       <h1>Реєстрація</h1>
        <div className='inputs'>
          <input
            type="text"
            placeholder='*Email'
    
            />

          <input
            type="text"
            placeholder="*Ім`я"
       
            />

        
            
          <input
            type="text"
            placeholder='*Пароль'
            
            />

          </div>
          <div className='swich_button'>
        <button className='accept_button'>
          Підтвердити
        </button>
        <button className='reg_button' onClick={() => setIsRegister(false)}>Увійти</button>
        </div>
      </>
    )
}

export default LogiModal;

    //  <div className="modal-container" onClick={closeLoginModal}>
    //   <div className="login_modal" onClick={(e) => e.stopPropagation()}>
    //     <h1>Увійти</h1>
    //     <div className='inputs'>
    //       <input
    //         type="text"
    //         placeholder='*Email'
           
    //       />
    //       <input
    //         type="text"
    //         placeholder='*Пароль'
           
    //       />
    //     </div>
    //     <div className='swich_button'>
    //     <button className='accept_button'>
    //       Підтвердити
    //     </button>
    //    <div onClick={closeLoginModal}>
    //     <button className='reg_button'  onClick={() => setOpenReg(!openReg)} >Реєстрація</button>
    //     </div>
    //     <RegistrationModal  closeRegModal={closeRegModal} openReg={openReg} />
    //     </div>
    // </div>
        


    //   </div>