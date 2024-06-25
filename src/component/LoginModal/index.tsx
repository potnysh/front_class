import React, { useState } from "react";
import "./style.css";
import RegistrationModal from "../RegistrationModal";
import { useSectionsContext } from "../SectionProvider";
import { axios } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const LogiModal = ({ openLogin, closeLoginModal }) => {
  // const { signIn } = useSectionsContext();
  const [isRegister, setIsRegister] = useState(false);

  const closeModal = () => {
    setIsRegister(false);
    closeLoginModal();
  };

  const handleLogin = () => {};

  if (!openLogin) return null;

  return (
    <div className="modal-container" onClick={closeModal}>
      <div className="login_modal" onClick={(e) => e.stopPropagation()}>
        {isRegister ? (
          <RegisterForm setIsRegister={setIsRegister} />
        ) : (
          <LoginForm setIsRegister={setIsRegister} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

const LoginForm = ({ setIsRegister, closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Всі поля є обов'язковими.");
      return;
    }
    try {
      const res = await axios.post("/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Увійти</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="*Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="*Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="swich_button">
        <button onClick={handleLogin} className="accept_button">
          Підтвердити
        </button>
        <div>
          <button className="reg_button" onClick={() => setIsRegister(true)}>
            Реєстрація
          </button>
        </div>
      </div>
    </>
  );
};

const RegisterForm = ({ setIsRegister }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !name) {
      alert("Всі поля є обов'язковими.");
      return;
    }
    try {
      console.log(email, password, name);
      const res = await axios.post("/auth/signup", {
        email,
        name,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Реєстрація</h1>
      <div className="inputs">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="*Email"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="*Ім`я"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="*Пароль"
        />
      </div>
      <div className="swich_button">
        <button onClick={() => handleRegister()} className="accept_button">
          Підтвердити
        </button>
        <button
          type="button"
          className="reg_button"
          onClick={() => setIsRegister(false)}
        >
          Увійти
        </button>
      </div>
    </>
  );
};

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
