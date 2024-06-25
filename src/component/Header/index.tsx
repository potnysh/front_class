import React from "react";
import "./style.css";
import { IoAdd } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useState } from "react";
import AddSectionModal from "../AddSectionModal";
import LoginModal from "../LoginModal";
import UserListModal from "../UserListModal";
import { useSectionsContext } from "../SectionProvider";

function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useSectionsContext();

  const closeLoginModal = () => {
    setOpenLogin(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  console.log(user);

  const [users, setUsers] = useState([
    { id: 1, name: 'Freddy Adamson', status: 'User' },
    { id: 2, name: 'Siver Maxim', status: 'Admin' },
    { id: 3, name: 'Nicky Johnson', status: 'User' },
  ]);

  const updateUserStatus = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <div className="header">
      <div className="logo">
        <h1>Історія України</h1>
      </div>
      {user?.status === "admin" && (
        <>
          <button className="add_button" onClick={() => setOpen(!open)}>
            <IconContext.Provider value={{ className: "add_icon" }}>
              <div>
                <IoAdd />
              </div>
            </IconContext.Provider>
          </button>
          <AddSectionModal closeModal={closeModal} open={open} />
        </>
      )}
      {user?.status === "admin" ? (
        <>
          <button className="log_buton" onClick={() => setOpenAdmin(!openAdmin)}>
            Адмін
          </button>

          {openAdmin && <UserListModal logOut={logOut} setOpenAdmin={setOpenAdmin} updateUserStatus={updateUserStatus}  />}
        </>


      ) : user ? (
        <button className="log_buton" onClick={() => logOut()}>
          Вийти
        </button>
      ) : (
        <>
          <button
            className="log_buton"
            onClick={() => setOpenLogin(!openLogin)}
          >
            Увійти
          </button>

          <LoginModal closeLoginModal={closeLoginModal} openLogin={openLogin} />
        </>
      )}
    </div>
  );
}

export default Header;
