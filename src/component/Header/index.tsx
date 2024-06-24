import React from 'react';
import './style.css'
import { IoAdd } from "react-icons/io5";
import { IconContext } from "react-icons";
import {useState} from 'react'
import AddSectionModal from '../AddSectionModal';
import LoginModal from "../LoginModal"
import { SectionsProvider, useSectionsContext } from '../SectionProvider';


function Header() {
    
    const [openLogin, setOpenLogin] = useState(false);
    const [open, setOpen] = useState(false);
    const { user } = useSectionsContext();
    
    const closeLoginModal = () => {
        setOpenLogin(false);
    }

    const closeModal = () => {
        setOpen(false);
    }

    console.log(user)

	return (
		<div className="header">
            <div className='logo'>
			<h1>Історія України</h1>
            </div>
            

                <button className='add_button' onClick={() => setOpen(!open)}>
                    <IconContext.Provider value={{className: "add_icon" }}>
                <div>
                    <IoAdd />
                </div>
                </IconContext.Provider>
                </button>
                <AddSectionModal closeModal={closeModal} open={open} />       
                
                <button className='log_buton' onClick={() => setOpenLogin(!openLogin)}>
                Увійти   
                </button>    

                <LoginModal closeLoginModal={closeLoginModal} openLogin={openLogin} />   

		</div>
	)
}

export default Header;

