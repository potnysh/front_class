import React, { useState } from 'react';
import './style.css';
import { FaMonument } from "react-icons/fa6";
import { GiWhiteTower } from "react-icons/gi";
import { BiSolidCastle } from "react-icons/bi";
import { GiSaintBasilCathedral } from "react-icons/gi";
import { LuTent } from "react-icons/lu";
import { IconContext } from "react-icons";
import { useSectionsContext } from '../SectionProvider';

const AddSectionModal = ({ open, closeModal }) => {
  const { addSection } = useSectionsContext();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
const icons = [
    { component: FaMonument, id: 1 },
    { component: GiWhiteTower, id: 2 },
    { component: BiSolidCastle, id: 3 },
    { component: GiSaintBasilCathedral, id: 4 },
    { component: LuTent, id: 5 }
  ];


  const handleSave = () => {
    if (!name || !year || !selectedIcon) {
      alert("Всі поля є обов'язковими.");
      return;
    }

    addSection({ name, year: parseInt(year, 10), icon: selectedIcon });
    setName('');
    setYear('');
    setSelectedIcon(null);
    closeModal();
  };

  

  if (!open) return null;

  return (
     <div className="modal-container" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>Створення нового розділу</h1>
        <div className='inputs'>
          <input
            type="text"
            placeholder='*Назва'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder='*Рік'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className='icon_box'>
          {icons.map(({ component: Icon, id }) => (
            <div
              key={id}
              className={`icon ${selectedIcon === id ? 'selected' : ''}`}
              onClick={() => setSelectedIcon(id)}
            >
              <IconContext.Provider value={{ size: "2.3em" }}>
                <Icon />
              </IconContext.Provider>
            </div>
          ))}
        </div>
        <button className='accept_button' onClick={handleSave}>
          Підтвердити
        </button>
      </div>
    </div>
  );
};

export default AddSectionModal;